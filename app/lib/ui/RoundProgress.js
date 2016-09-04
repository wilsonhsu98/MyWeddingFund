/**
 * UI Component: RoundProgress
 * @author Wilson Hsu
 * @version 2013/10/03
 */

/**
 * @class
 * @description
 * The UI component helps you to create a round progress, and support for AMD module loader.
 *
 * How to Create a round progress?
 * 1.Instantiate a round progress object.
 * 2.Give some optional parameters.
 * @example
	var progress = new RoundProgress(document.getElementById("container"), {
		"displayGearwheel": true,	// bool, default: ture
		"radius": 50,				// any integer
		"lineWidth": 5,				// any integer
		"lineCap": "butt",			// each end style of the line. round", "butt", or "square", default "butt"
		"max": 100,
		"value": 0,
		"interval": 500,
		"bgStyle": "gradient",		// "gradient" or "image", defualt: "gradient"
		"bgGradientTop": "#28cfbb",	// if bgStyle is "gradient" then necessary
		"bgGradientDown": "#45BBE6",// if bgStyle is "gradient" then necessary
		"bgSrc": "xxx.png",			// if bgStyle is image then "necessary", but if can not load the image, will use the gradient background automatically.
		"animateStyle": "liner"		// specifies the speed curve of the animation. "liner" or "easeInOutQuad", defualt: "liner"
	});
 *
 * How to get/set the progress value?
 * 1.Call the prototype function .getValue() and .setValue(value)
 * @example
	progress.getValue();	//get value
	progress.setValue(1);	//set value
 *
 * How to listen the event?
 * 1.Use .on() to listen the event.
 * 2."change" means the progress value has changed.
 * 3."complete" means the progress value equal to the max value.
 * @example
	progress.on("change", function () {
		var value = this.getValue();
		//show the current value
	});
	progress.on("complete", function () {
		//do something after finish
	});
 */

(function (wndw, factory) {
	if (typeof define === 'function' && define.amd) {
		define(["jquery"], function ($) {
			return factory($);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		wndw.RoundProgress = factory(wndw.$);
	}
})(window, function ($) {
	var RoundProgressModule = function ($) {
		var _private = {
			defaults: {
				"displayGearwheel": true,
				"radius": 50,				// any integer
				"lineWidth": 5,				// any integer
				"lineCap": "butt",			// round, butt, or square
				"max": 100,
				"value": 0,
				"interval": 500,
				"bgStyle": "gradient",		// gradient or image
				"bgGradientTop": "#28cfbb",	// if bgStyle is "gradient" then necessary
				"bgGradientDown": "#45BBE6",// if bgStyle is "gradient" then necessary
				"bgSrc": "",				// if bgStyle is image then "necessary", but if can not load the image, will use the gradient background automatically.
				"animateStyle": "liner"		// liner or easeInOutQuad
			},
			getOrMakeObject: function (elem, options) {
				var widget = $(elem).data('round_progress.object');
				if (widget && widget.constructor === RoundProgress.prototype.constructor) {
					if (options) _private.customize.call(widget, options);
					return widget;
				} else {
					widget = new RoundProgress($(elem), options);
					$(elem).data('round_progress.object', widget);
					return widget;
				}
			},
			customize: function (options) {
				var _p = _private,
					dataDefaults = {};
				for (var optKey in _p.defaults) {
					dataDefaults[optKey] = this.$elem.attr("data-round_progress-" + optKey);
				}
				this.options = $.extend({}, _p.defaults, dataDefaults, options);

				this.min = 0;
				this.val = this.options.value;
				this.radius = this.options.radius;
				this.diameter = this.radius * 2;

				// Progress container
				var containerClass = "";
				if (this.radius > 0) {
					containerClass = "--" + this.diameter;
				}
				this.$elem.addClass("round-block round-block" + containerClass);

				// Get sub elements of progress container first
				var $subContainer = this.$elem.children();
				$subContainer.addClass("round-block__number");

				// Draw progress track, do not draw it again when it is aleady exist when reset options.
				if(!this.gearWheel) {
					_p._drawProgressTrack.call(this);
				}

				// Progressbar container
				var $ProgressbarContainer = $("<div></div>")
									.css({
										"width": this.diameter,
										"height": this.diameter,
										"position": "relative"
									})
									.attr({
										"role": "progressbar",
										"aria-valuemin": this.min,
										"aria-valuemax": this.options.max,
										"aria-valuenow": _p.value.call(this)
									});
				$ProgressbarContainer.appendTo(this.$elem);

				// Sub container
				if ($subContainer.length > 0)
					$subContainer.appendTo($ProgressbarContainer);

				// Draw progress
				$ProgressbarContainer.append(_p._drawProgressbar.call(this));

				// Run / Pause gearwheel
				if (this.options.displayGearwheel)
					_p.runningGearwheel.call(this);
				else
					_p.hideGearwheel.call(this);

			},
			_drawProgressbar: function () {

				var that = this,
					circ = Math.PI * 2,
					quart = Math.PI / 2,
					inside_radius = this.radius - (this.options.lineWidth / 2);

				this.canvas = $("<canvas></canvas>")
					.css({
						"display": "none",
						"position": "absolute",
						"top": "0",
						"left": "0",
						"opacity": "1",
						"width": this.diameter,
						"height": this.diameter
					})
					.attr({
						"width": this.diameter,
						"height": this.diameter
					});
				this.oldValue = _private.value.call(this) > 0 ? 0 : _private.value.call(this);
				this.draw = function (percent) {
					that.ctx.clearRect(0, 0, that.diameter, that.diameter);
					that.ctx.beginPath();
					that.ctx.arc(that.radius, that.radius, inside_radius, -(quart), ((circ) * percent / 100) - quart, false);
					that.ctx.stroke();
				};
				this.ctx = this.canvas[0].getContext('2d');
				this.ctx.lineWidth = this.options.lineWidth;
				this.ctx.lineCap = this.options.lineCap;
				switch (this.options.animateStyle) {
					case "easeInOutQuad":
						this.animateStyle = function (p) { return p < 0.5 ? Math.pow(p * 2, 2) / 2 : 1 - Math.pow(p * -2 + 2, 2) / 2; };
						break;
					case "liner":
					default:
						this.animateStyle = function (p) { return p; };
						break;
				}
				switch (this.options.bgStyle) {
					case "image":
						var img = new Image();
						img.src = this.options.bgSrc;
						img.onload = function () {
							var imgCanvas = document.createElement('canvas'),
								imgCtx = imgCanvas.getContext('2d');
							imgCanvas.height = that.diameter;
							imgCanvas.width = that.diameter;
							imgCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, that.diameter, that.diameter);
							that.ctx.strokeStyle = that.ctx.createPattern(imgCanvas, 'repeat');

							_private.refreshValue.call(that);
						};
						img.onerror = function () {
							that.ctx.strokeStyle = that.ctx.createLinearGradient(0, 0, 0, that.diameter);
							that.ctx.strokeStyle.addColorStop("0", that.options.bgGradientTop);
							that.ctx.strokeStyle.addColorStop("1", that.options.bgGradientDown);

							_private.refreshValue.call(that);
						};
						break;
					case "gradient":
					default:
						that.ctx.strokeStyle = that.ctx.createLinearGradient(0, 0, 0, that.diameter);
						that.ctx.strokeStyle.addColorStop("0", that.options.bgGradientTop);
						that.ctx.strokeStyle.addColorStop("1", that.options.bgGradientDown);

						_private.refreshValue.call(that);
						break;
				}

				return this.canvas;
			},
			_drawProgressTrack: function () {
				var $progressTrack = $("<canvas></canvas>")
					.addClass("round-block__track")
					.attr({
						"width": this.diameter,
						"height": this.diameter
					})
					.appendTo(this.$elem);
				this.ctxTrack = $progressTrack[0].getContext("2d");
				$progressTrack.appendTo(this.$elem);
				this.gearWheel = $progressTrack;
				// Draw the element into document first for getting element's background image.
				var $div = $("<div class='round-block__track--" + this.diameter + "'></div>");
				$div.appendTo("body");
				var pattern = /url\(|\)|"|'/g;
				var imagePath = $div.css('background-image').replace(pattern,"");
				if (imagePath && imagePath !== 'none') {
					this.imgTrack = new Image();
					this.imgTrack.src = imagePath;
				}
				$div.remove();
			},
			_rotateImage: function(canvas,ctx,degree,img){
				ctx.clearRect(0,0,canvas.width,canvas.height);
				ctx.save();
				ctx.translate(canvas.width/2,canvas.height/2);
				ctx.rotate(degree*Math.PI/180);
				ctx.drawImage(img,-img.width/2,-img.width/2);
				ctx.restore();
			},
			value: function () {
				var val = this.val;

				// normalize invalid value
				if (typeof val !== "number") {
					val = 0;
				}

				return Math.min(this.options.max, Math.max(this.min, val));
			},
			percentage: function () {
				return 100 * _private.value.call(this) / this.options.max;
			},
			reset: function () {
				this.oldValue=0;
				this.ctx.clearRect(0, 0, this.diameter, this.diameter);
			},
			refreshValue: function () {
				var _p = _private, that = this;
				this.canvas.css({ 'display': 'block' });

				var value = _p.value.call(this);
				var startPercent = this.oldValue / this.options.max * 100;
				var curPercent = this.oldValue;
				var endPercent = _p.percentage.call(this);
				var start = null;

				var animate = function (timestamp) {
					if (start === null) start = timestamp;
					var deltaTime = timestamp - start;
					var newPercent;
					if (startPercent < endPercent) {
						newPercent = (function (d, s, e, i) { return s + that.animateStyle(d / i) * (e - s); })(deltaTime, startPercent, endPercent, that.options.interval);
					}
					else {//revert animate
						newPercent = (function (d, s, e, i) { return s - that.animateStyle(d / i) * (s - e); })(deltaTime, startPercent, endPercent, that.options.interval);
					}
					curPercent = newPercent;

					if (deltaTime >= that.options.interval) {//|| curPercent >= endPercent
						curPercent = endPercent;
						that.draw(curPercent);
						if (that.options.max === value) {
							that.fire('complete');
						}
					}
					else {
						that.draw(curPercent);
						window.requestAnimationFrame(animate);
					}
				};

				if (endPercent === 0 && startPercent === 0) {
					this.ctx.clearRect(0, 0, this.diameter, this.diameter);
				}
				else if (endPercent !== startPercent) {
					window.requestAnimationFrame(animate);
				}

				if(this.oldValue===0 && value>0){
					this.fire('init_change');
				}

				if (this.oldValue !== value) {
					this.fire('change', value);
					this.oldValue = value;
				}

				this.$elem.attr("aria-valuenow", value);
			},
			stopGearwheel: function () {
				clearInterval(this.gearwheel_rotate_anticlockwise);
			},
			runningGearwheel: function () {
				this.showGearwheel();
				this.stopGearwheel();
				var degree = 0;
				var that = this;
				this.gearwheel_rotate_anticlockwise = setInterval(function(){
					_private._rotateImage(that.gearWheel[0], that.ctxTrack, degree, that.imgTrack);
					degree -= 0.3;
				}, 60);
			},
			hideGearwheel: function () {
				this.gearWheel.addClass("hide");
			},
			showGearwheel: function () {
				this.gearWheel.removeClass("hide");
			},
			hideRound: function () {
				this.stopGearwheel();
				this.$elem.addClass("hide");
			},
			showRound: function () {
				this.$elem.removeClass("hide");
			}
		};

		function EventTarget() {
			this._listeners = {};
		}
		EventTarget.prototype = {
			constructor: EventTarget,
			on: function (type, listener) {
				if (typeof this._listeners[type] === "undefined") {
					this._listeners[type] = [];
				}
				this._listeners[type].push(listener);
				return this;
			},
			fire: function (eventName, value) {
				var event = { type: eventName };
				if (!event.target) {
					event.target = this;
				}

				if (this._listeners[event.type] instanceof Array) {
					var listeners = this._listeners[event.type];
					for (var i = 0, len = listeners.length; i < len; i++) {
						listeners[i].call(this, value || event);
					}
				}
			}
		};

		var RoundProgress = function (elem, options) {
			this.$elem = $(elem);
			EventTarget.call(this);
			_private.customize.call(this, options);
		};
		RoundProgress.prototype = new EventTarget();
		RoundProgress.prototype.constructor = RoundProgress;
		RoundProgress.prototype.setValue = function (value) {
			this.val = value;
			if(this.oldValue != this.val){
				_private.refreshValue.call(this);
			}
		};
		RoundProgress.prototype.setOptions = function(options) {
			_private.reset.call(this);
			_private.customize.call(this, options);
		}
		RoundProgress.prototype.getValue = function () {
			return _private.value();
		};
		RoundProgress.prototype.reset = function () {
			_private.reset.call(this);
		};
		RoundProgress.prototype.stopGearwheel = function () {
			_private.stopGearwheel.call(this);
		};
		RoundProgress.prototype.runningGearwheel = function () {
			_private.runningGearwheel.call(this);
		};
		RoundProgress.prototype.hideGearwheel = function () {
			_private.hideGearwheel.call(this);
		};
		RoundProgress.prototype.showGearwheel = function () {
			_private.showGearwheel.call(this);
		};
		RoundProgress.prototype.hideRound = function () {
			_private.hideRound.call(this);
		};
		RoundProgress.prototype.showRound = function () {
			_private.showRound.call(this);
		};

		var _public = function (el, options) {
			return _private.getOrMakeObject(el, options);
		};
		_public.start = function (elem) {
			var $elem = $(elem);
			if ($elem.data('roundprogress-initialized')) {
				return;
			} else {
				$elem.data('roundprogress-initialized', 1);
			}
			$elem.find('[data-roundprogress]').each(function () {
				_public(this);
			});
		};
		_public.start(document.body);

		return _public;
	};
	return RoundProgressModule($);
});
