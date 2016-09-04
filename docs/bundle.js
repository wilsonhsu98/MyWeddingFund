webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _es6Promise = __webpack_require__(2);

	var _es6Promise2 = _interopRequireDefault(_es6Promise);

	__webpack_require__(7);

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(13);

	var _reactRedux = __webpack_require__(14);

	var _action = __webpack_require__(32);

	var _store = __webpack_require__(36);

	var _store2 = _interopRequireDefault(_store);

	var _Spreadsheet = __webpack_require__(40);

	var _Spreadsheet2 = _interopRequireDefault(_Spreadsheet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	_es6Promise2.default.polyfill();

	var store = (0, _store2.default)();
	var currentData = undefined;
	store.subscribe(function () {
	    var prevData = currentData;
	    currentData = store.getState().overallReducer.data;
	    if (prevData !== currentData) {
	        (0, _action.setLocalStorage)(currentData);
	    } else {
	        console.log('same');
	    }
	});

	var Root = (function (_Component) {
	    _inherits(Root, _Component);

	    function Root() {
	        _classCallCheck(this, Root);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Root).apply(this, arguments));
	    }

	    _createClass(Root, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2.default.createElement(_Spreadsheet2.default, null)
	            );
	        }
	    }]);

	    return Root;
	})(_react.Component);

	(0, _reactDom.render)(_react2.default.createElement(Root, null), document.getElementById('main'));

	document.title = '收禮平台';

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(5);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;

	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;

	        enumerator._init();

	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;

	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;

	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }

	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }

	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(6)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), (function() { return this; }()), __webpack_require__(4)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js?includePaths[]=/Users/hsuwilson/MyWeddingFund/node_modules/compass-mixins/lib!./main.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js?includePaths[]=/Users/hsuwilson/MyWeddingFund/node_modules/compass-mixins/lib!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font: inherit;\n  font-size: 100%;\n  vertical-align: baseline; }\n\nhtml {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ncaption, th, td {\n  text-align: left;\n  font-weight: normal;\n  vertical-align: middle; }\n\nq, blockquote {\n  quotes: none; }\n  q:before, q:after, blockquote:before, blockquote:after {\n    content: \"\";\n    content: none; }\n\na img {\n  border: none; }\n\nelements-of-type(html5-block) {\n  display: block; }\n\n.test {\n  background: #ccc url(" + __webpack_require__(10) + ") 0 0 no-repeat; }\n\nbody {\n  font: 20px 微軟正黑體;\n  overflow-y: scroll; }\n\n.title {\n  font: 30px 微軟正黑體;\n  text-align: center;\n  padding: 10px; }\n\n.spread-sheet {\n  position: relative; }\n  .spread-sheet .block-page {\n    display: inline-block;\n    position: absolute;\n    top: 0;\n    right: 0; }\n    .spread-sheet .block-page.open {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      background-color: rgba(204, 204, 204, 0.9); }\n      .spread-sheet .block-page.open .btn-open-block {\n        display: none; }\n      .spread-sheet .block-page.open .cloud-iframe {\n        display: inherit;\n        visibility: visible;\n        position: absolute;\n        width: 90%;\n        height: 90%;\n        top: 5%;\n        right: 5%;\n        bottom: 5%;\n        left: 5%; }\n      .spread-sheet .block-page.open .round-block, .spread-sheet .block-page.open .pwd-block {\n        display: inherit;\n        visibility: visible;\n        position: absolute;\n        margin: auto;\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0; }\n      .spread-sheet .block-page.open .pwd-block {\n        width: 200px;\n        height: 100px;\n        line-height: 100px;\n        text-align: center; }\n    .spread-sheet .block-page .cloud-iframe, .spread-sheet .block-page .round-block, .spread-sheet .block-page .pwd-block {\n      display: none;\n      visibility: hidden; }\n\n.sheet-list {\n  padding: 10px; }\n\n.sheet-table {\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: collapse;\n  border: 1px solid #999; }\n  .sheet-table th, .sheet-table td {\n    padding: 0 2px;\n    line-height: 50px; }\n    .sheet-table th.heightlight, .sheet-table td.heightlight {\n      font-weight: bold;\n      font-size: 40px;\n      color: red; }\n  .sheet-table th, .sheet-table td.center {\n    text-align: center; }\n\n.sheet-row {\n  border-bottom: 1px solid #999; }\n  .sheet-row.hide {\n    display: none; }\n  .sheet-row.find {\n    background-color: #FFD1D1; }\n  .sheet-row .td-for-barcode {\n    width: 200px;\n    display: none; }\n  .sheet-row img {\n    vertical-align: middle; }\n\n.bar-code {\n  display: inline-block;\n  width: 200px;\n  height: 40px; }\n\n.search-bar {\n  display: inline-block;\n  float: left;\n  margin-bottom: 10px;\n  padding-left: 4px; }\n  .search-bar > * {\n    vertical-align: middle; }\n  .search-bar .chk-block {\n    display: inline-block; }\n\n.button-bar {\n  display: inline-block;\n  float: right;\n  margin-bottom: 10px; }\n\n.money-list {\n  display: none; }\n\nbutton {\n  font: 20px 微軟正黑體;\n  height: 35px;\n  line-height: 35px;\n  padding: 0 8px;\n  margin: 0 4px;\n  border: 1px solid darkgray;\n  border-radius: 4px; }\n  button.btn-refresh {\n    visibility: hidden; }\n\ninput[type=text], input[type=password] {\n  font: 20px 微軟正黑體;\n  width: 100px;\n  height: 35px;\n  line-height: 35px;\n  padding: 8px;\n  border: 1px solid darkgray;\n  border-radius: 4px;\n  box-sizing: border-box; }\n  input[type=text]:disabled, input[type=password]:disabled {\n    background-color: #CCC; }\n\nselect {\n  width: 100%;\n  max-width: 300px;\n  font: 20px 微軟正黑體;\n  height: 35px;\n  line-height: 35px;\n  padding: 0 0 0 8px;\n  border: 1px solid darkgray;\n  border-radius: 2px;\n  box-sizing: border-box; }\n\n.hidden {\n  display: none; }\n\n.round-block {\n  position: relative;\n  width: 400px;\n  height: 400px; }\n  .round-block.hide {\n    -webkit-animation-name: fadeOutRound;\n    -webkit-animation-duration: 0.5s;\n    -webkit-animation-timing-function: linear;\n    -webkit-animation-fill-mode: forwards; }\n  .round-block .round-block__track {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n    .round-block .round-block__track.hide {\n      display: none; }\n  .round-block .round-block__number {\n    display: block;\n    width: 100%;\n    height: 100%;\n    line-height: 400px;\n    text-align: center;\n    color: #FFF;\n    font-size: 100px;\n    font-weight: bold; }\n\n@media screen and (max-width: 640px) {\n  body,\n  .sheet-table td.heightlight {\n    font-size: 16px; }\n  input[type=text] {\n    font-size: 16px;\n    padding: 2px 5px; }\n  button.btn-refresh {\n    position: absolute;\n    top: 2px;\n    right: 2px;\n    font-size: 16px;\n    padding: 0 4px;\n    margin: 0;\n    height: 30px;\n    line-height: 18px;\n    visibility: visible; }\n  .title {\n    font-size: 18px;\n    font-weight: bold; }\n  .sheet-table .sheet-row {\n    border-top: 1px solid #999; }\n  .sheet-table td {\n    text-align: left;\n    display: block;\n    line-height: 30px;\n    padding-left: 60px; }\n    .sheet-table td.center {\n      text-align: left; }\n    .sheet-table td:before {\n      margin-left: -60px;\n      font-size: 16px;\n      color: initial;\n      content: attr(data-th) \":\";\n      font-weight: bold;\n      display: inline-block;\n      width: 40px;\n      text-align: right;\n      padding: 0 10px; }\n  .no-mobile,\n  .spread-sheet .block-page,\n  .sheet-table th {\n    display: none !important; } }\n\n@media print {\n  .sheet-list {\n    margin: 0;\n    padding: 0; }\n  .sheet-table {\n    margin: 0;\n    padding: 0;\n    border-spacing: 0;\n    border-collapse: collapse;\n    border: none; }\n  .sheet-row, .sheet-row.hide {\n    margin: 0;\n    padding: 0;\n    width: 33%;\n    height: 3.58cm;\n    display: inline-block;\n    border-bottom: none;\n    text-align: center; }\n  .sheet-row td:not(.no-print) {\n    margin: 0;\n    display: inline-block; }\n  .sheet-row td.td-for-barcode {\n    margin: 10px 5px 0 10px;\n    display: inline-block; }\n  .sheet-row div {\n    line-height: 17px;\n    font-size: 15px;\n    text-align: center; }\n  .no-print {\n    display: none; }\n  .money-list.sheet-table {\n    margin: 30px;\n    padding: 0;\n    display: table;\n    page-break-after: always; }\n    .money-list.sheet-table div {\n      margin-bottom: 60px; } }\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAUCAMAAADm3a4bAAABC1BMVEUAAADtHCQzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzN3SEozMzMzMzMzMzPtHCTtHCQzMzMzMzMzMzPtHCQzMzMzMzMzMzPtHCTtHCTtHCTtHCQzMzMzMzMzMzMzMzMzMzMzMzPtHCTtHCTtHCTtHCQzMzPtHCQzMzMzMzMzMzMzMzMzMzMzMzPtHCT///8zMzP5trntHCTxSlH2jJD0en/////7y835sbMzMzPtHCQzMzP////tIirxUFbyWV/+8PH95+juLDT4o6f0cHX+9fb3mJzwQEf5rK/70NL/+/vxSVDzX2X82Nn1e3/5t7r83d72iY76w8X83+D1horvMTn6v8HzZ2ztHCQXdl3CAAAAOnRSTlMAWzK8yoYHeBEePALdYOLvsAuMogiu+VolcajkaJM/IhZ9lEo60+jKxXdIRZXp8pZTnZpkJ7FaWvLx7rGI7gAAAdFJREFUOMu9lGdz4jAQhhcXWY6BoxwkJIRyJZd2vVsL2HRIIFeS/P+fkl0JU/Ip/pJnBi0jz+N9JWsEmpeZwoswPPryOoDUZMg0vH2TUg1eJerV8Hb4NZ28cvuTXvdqGeOPVJmN2+mYV0T4jWcV4/k8Vlrgca2Dq0qwp3x+mM/pvfoQ7jDA7zxtWerYavmqbV0ol2TLslokK1/Lx42KutCNdxnj8gAY5QH4ah+klpvNZgBuVZW17IFQZQAocOTBdC3fY7e2JTOWjk2Smy2pupEhawMAfaXrBU4S924eh4dbsntO6ySZZ0iW6reRgyp3Drsx4uimu17yMny3E7usJMlSSkEytBXLbd9Vn1imVWIvadzDReeR3FCeie2yXKyyTJwBcdQfYbQ+JdFoEq5iUycIpKBfEYQkBBWAogxAShqYwhBxmvSN5pyh9vQzMkAcm2Pydz665j8HOnWurrg6ezye2ZfAVCsO98w5p+aQ/EKcdUgd/sFYb1sBmGy5kt3Ip9AAJr+fF1yEeA/MT0T8P/0XId70Q9NYS7btbGQbzo186XI5EeIENB9RM1tteQaMXHK3ZM8uAWMXHaFjOznQBJ8X8WycfOjaM14Gm2voMOU19AAFn2XnYyF3zwAAAABJRU5ErkJggg=="

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _componentsProvider = __webpack_require__(15);

	exports.Provider = _interopRequire(_componentsProvider);

	var _componentsConnect = __webpack_require__(17);

	exports.connect = _interopRequire(_componentsConnect);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(12);

	var _utilsStoreShape = __webpack_require__(16);

	var _utilsStoreShape2 = _interopRequireDefault(_utilsStoreShape);

	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }

	  didWarnAboutReceivingStore = true;
	  console.error( // eslint-disable-line no-console
	  '<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/rackt/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}

	var Provider = (function (_Component) {
	  _inherits(Provider, _Component);

	  Provider.prototype.getChildContext = function getChildContext() {
	    return { store: this.store };
	  };

	  function Provider(props, context) {
	    _classCallCheck(this, Provider);

	    _Component.call(this, props, context);
	    this.store = props.store;
	  }

	  Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;

	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };

	  Provider.prototype.render = function render() {
	    var children = this.props.children;

	    return _react.Children.only(children);
	  };

	  return Provider;
	})(_react.Component);

	exports['default'] = Provider;

	Provider.propTypes = {
	  store: _utilsStoreShape2['default'].isRequired,
	  children: _react.PropTypes.element.isRequired
	};
	Provider.childContextTypes = {
	  store: _utilsStoreShape2['default'].isRequired
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(12);

	exports['default'] = _react.PropTypes.shape({
	  subscribe: _react.PropTypes.func.isRequired,
	  dispatch: _react.PropTypes.func.isRequired,
	  getState: _react.PropTypes.func.isRequired
	});
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = connect;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _utilsStoreShape = __webpack_require__(16);

	var _utilsStoreShape2 = _interopRequireDefault(_utilsStoreShape);

	var _utilsShallowEqual = __webpack_require__(18);

	var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

	var _utilsIsPlainObject = __webpack_require__(19);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsWrapActionCreators = __webpack_require__(20);

	var _utilsWrapActionCreators2 = _interopRequireDefault(_utilsWrapActionCreators);

	var _hoistNonReactStatics = __webpack_require__(30);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _invariant = __webpack_require__(31);

	var _invariant2 = _interopRequireDefault(_invariant);

	var defaultMapStateToProps = function defaultMapStateToProps() {
	  return {};
	};
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	// Helps track hot reloading.
	var nextVersion = 0;

	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	  var shouldSubscribe = Boolean(mapStateToProps);
	  var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
	  var finalMapDispatchToProps = _utilsIsPlainObject2['default'](mapDispatchToProps) ? _utilsWrapActionCreators2['default'](mapDispatchToProps) : mapDispatchToProps || defaultMapDispatchToProps;
	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var shouldUpdateStateProps = finalMapStateToProps.length > 1;
	  var shouldUpdateDispatchProps = finalMapDispatchToProps.length > 1;
	  var _options$pure = options.pure;
	  var pure = _options$pure === undefined ? true : _options$pure;
	  var _options$withRef = options.withRef;
	  var withRef = _options$withRef === undefined ? false : _options$withRef;

	  // Helps track hot reloading.
	  var version = nextVersion++;

	  function computeStateProps(store, props) {
	    var state = store.getState();
	    var stateProps = shouldUpdateStateProps ? finalMapStateToProps(state, props) : finalMapStateToProps(state);

	    _invariant2['default'](_utilsIsPlainObject2['default'](stateProps), '`mapStateToProps` must return an object. Instead received %s.', stateProps);
	    return stateProps;
	  }

	  function computeDispatchProps(store, props) {
	    var dispatch = store.dispatch;

	    var dispatchProps = shouldUpdateDispatchProps ? finalMapDispatchToProps(dispatch, props) : finalMapDispatchToProps(dispatch);

	    _invariant2['default'](_utilsIsPlainObject2['default'](dispatchProps), '`mapDispatchToProps` must return an object. Instead received %s.', dispatchProps);
	    return dispatchProps;
	  }

	  function _computeNextState(stateProps, dispatchProps, parentProps) {
	    var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	    _invariant2['default'](_utilsIsPlainObject2['default'](mergedProps), '`mergeProps` must return an object. Instead received %s.', mergedProps);
	    return mergedProps;
	  }

	  return function wrapWithConnect(WrappedComponent) {
	    var Connect = (function (_Component) {
	      _inherits(Connect, _Component);

	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	        if (!pure) {
	          this.updateStateProps(nextProps);
	          this.updateDispatchProps(nextProps);
	          this.updateState(nextProps);
	          return true;
	        }

	        var storeChanged = nextState.storeState !== this.state.storeState;
	        var propsChanged = !_utilsShallowEqual2['default'](nextProps, this.props);
	        var mapStateProducedChange = false;
	        var dispatchPropsChanged = false;

	        if (storeChanged || propsChanged && shouldUpdateStateProps) {
	          mapStateProducedChange = this.updateStateProps(nextProps);
	        }

	        if (propsChanged && shouldUpdateDispatchProps) {
	          dispatchPropsChanged = this.updateDispatchProps(nextProps);
	        }

	        if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
	          this.updateState(nextProps);
	          return true;
	        }

	        return false;
	      };

	      function Connect(props, context) {
	        _classCallCheck(this, Connect);

	        _Component.call(this, props, context);
	        this.version = version;
	        this.store = props.store || context.store;

	        _invariant2['default'](this.store, 'Could not find "store" in either the context or ' + ('props of "' + this.constructor.displayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + this.constructor.displayName + '".'));

	        this.stateProps = computeStateProps(this.store, props);
	        this.dispatchProps = computeDispatchProps(this.store, props);
	        this.state = { storeState: null };
	        this.updateState();
	      }

	      Connect.prototype.computeNextState = function computeNextState() {
	        var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	        return _computeNextState(this.stateProps, this.dispatchProps, props);
	      };

	      Connect.prototype.updateStateProps = function updateStateProps() {
	        var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	        var nextStateProps = computeStateProps(this.store, props);
	        if (_utilsShallowEqual2['default'](nextStateProps, this.stateProps)) {
	          return false;
	        }

	        this.stateProps = nextStateProps;
	        return true;
	      };

	      Connect.prototype.updateDispatchProps = function updateDispatchProps() {
	        var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	        var nextDispatchProps = computeDispatchProps(this.store, props);
	        if (_utilsShallowEqual2['default'](nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }

	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };

	      Connect.prototype.updateState = function updateState() {
	        var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	        this.nextState = this.computeNextState(props);
	      };

	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return typeof this.unsubscribe === 'function';
	      };

	      Connect.prototype.trySubscribe = function trySubscribe() {
	        if (shouldSubscribe && !this.unsubscribe) {
	          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	          this.handleChange();
	        }
	      };

	      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	        if (this.unsubscribe) {
	          this.unsubscribe();
	          this.unsubscribe = null;
	        }
	      };

	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.trySubscribe();
	      };

	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.tryUnsubscribe();
	      };

	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }

	        this.setState({
	          storeState: this.store.getState()
	        });
	      };

	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        _invariant2['default'](withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

	        return this.refs.wrappedInstance;
	      };

	      Connect.prototype.render = function render() {
	        var ref = withRef ? 'wrappedInstance' : null;
	        return _react2['default'].createElement(WrappedComponent, _extends({}, this.nextState, { ref: ref }));
	      };

	      return Connect;
	    })(_react.Component);

	    Connect.displayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: _utilsStoreShape2['default']
	    };
	    Connect.propTypes = {
	      store: _utilsStoreShape2['default']
	    };

	    if (process.env.NODE_ENV !== 'production') {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        if (this.version === version) {
	          return;
	        }

	        // We are hot reloading!
	        this.version = version;

	        // Update the state and bindings.
	        this.trySubscribe();
	        this.updateStateProps();
	        this.updateDispatchProps();
	        this.updateState();
	      };
	    }

	    return _hoistNonReactStatics2['default'](Connect, WrappedComponent);
	  };
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = shallowEqual;

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = exports["default"];

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = wrapActionCreators;

	var _redux = __webpack_require__(21);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return _redux.bindActionCreators(actionCreators, dispatch);
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(22);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(24);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(27);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(28);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(29);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(23);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, initialState) {
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);
	    var isSubscribed = true;

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(22);

	var _utilsIsPlainObject = __webpack_require__(23);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsMapValues = __webpack_require__(25);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(26);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	/* eslint-disable no-console */

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!_utilsIsPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */

	function combineReducers(reducers) {
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var hasChanged = false;
	    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	      return nextStateForKey;
	    });

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return hasChanged ? finalState : state;
	  };
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = pick;

	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(25);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    // eslint-disable-line no-eq-null
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(29);

	var _compose2 = _interopRequireDefault(_compose);

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
	    var keys = Object.getOwnPropertyNames(sourceComponent);
	    for (var i=0; i<keys.length; ++i) {
	        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
	            targetComponent[keys[i]] = sourceComponent[keys[i]];
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fetchData = fetchData;
	exports.insertData = insertData;
	exports.saveMoney = saveMoney;
	exports.saveOrder = saveOrder;
	exports.pushToCloud = pushToCloud;
	exports.setLocalStorage = setLocalStorage;
	exports.clearLocalStorage = clearLocalStorage;
	exports.toggleShowAll = toggleShowAll;

	var _isomorphicFetch = __webpack_require__(33);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _actionTypes = __webpack_require__(35);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var requestSource = function requestSource() {
	    return {
	        type: _actionTypes.GET_DATA
	    };
	};
	var receiveSource = function receiveSource(data) {
	    return {
	        type: _actionTypes.GET_DATA_SUCCESS,
	        data: data,
	        cat: Array.from(new Set(data.map(function (obj) {
	            return obj.cat;
	        }))).sort(function (a, b) {
	            return a.localeCompare(b);
	        })
	    };
	};
	var receiveFail = function receiveFail(error) {
	    return {
	        type: _actionTypes.GET_DATA_FAIL,
	        error: error
	    };
	};
	function fetchData() {
	    var localData = localStorage.getItem("guestData");
	    if (localData) {
	        return receiveSource(JSON.parse(localData));
	    } else {
	        return function (dispatch) {
	            dispatch(requestSource());
	            return Promise.all([(0, _isomorphicFetch2.default)(_actionTypes.SOURCE_JSON).then(function (response) {
	                if (response.status >= 400) throw new Error("Bad response from server");
	                return response.json();
	            }).then(function (json) {
	                return json.feed.entry || [];
	            }).then(function (data) {
	                return data.map(function (member) {
	                    return {
	                        key: member.gsx$sn.$t,
	                        order: '',
	                        name: member.gsx$姓名.$t,
	                        cat: member.gsx$男方女方親友.$t,
	                        cake: member.gsx$餅 ? member.gsx$餅.$t : '',
	                        table: member.gsx$桌次 ? member.gsx$桌次.$t : ''
	                    };
	                });
	            }), (0, _isomorphicFetch2.default)(_actionTypes.TARGET_JSON).then(function (response) {
	                if (response.status >= 400) throw new Error("Bad response from server");
	                return response.json();
	            }).then(function (json) {
	                return json.feed.entry || [];
	            }).then(function (data) {
	                return data.map(function (member) {
	                    return {
	                        key: member.gsx$sn.$t,
	                        order: member.gsx$順序.$t,
	                        name: member.gsx$姓名.$t,
	                        cat: member.gsx$男方女方親友.$t,
	                        money: member.gsx$禮金.$t,
	                        upload: true
	                    };
	                });
	            })]).then(function (pObj) {
	                var data = [].concat(_toConsumableArray(pObj[0].map(function (item0) {
	                    return Object.assign({}, item0, pObj[1].find(function (item1) {
	                        return item1.key === item0.key;
	                    }));
	                })), _toConsumableArray(pObj[1].map(function (item) {
	                    return item.key;
	                }).filter(function (key) {
	                    return !new Set(pObj[0].map(function (item) {
	                        return item.key;
	                    })).has(key);
	                }) // Get missing parts(keys) from target source
	                .map(function (key) {
	                    return pObj[1].find(function (item) {
	                        return item.key === key;
	                    });
	                }))). // Get missing parts(entire obj)
	                sort(function (a, b) {
	                    return parseInt(a.key, 10) - parseInt(b.key, 10);
	                });
	                dispatch(receiveSource(data));
	            }).catch(function (reason) {
	                dispatch(receiveFail(reason));
	            });
	        };
	    }
	}

	function insertData(name, cat, money) {
	    return {
	        type: _actionTypes.INSERT_DATA,
	        name: name,
	        cat: cat,
	        money: money
	    };
	}

	function saveMoney(key, money) {
	    return {
	        type: _actionTypes.SAVE_MONEY,
	        key: key,
	        money: money
	    };
	}

	function saveOrder(key, order) {
	    return {
	        type: _actionTypes.SAVE_ORDER,
	        key: key,
	        order: order
	    };
	}

	function pushToCloud(data) {
	    var requests = data.filter(function (obj) {
	        return obj.money && !obj.upload;
	    }).map(function (obj) {
	        return {
	            'entry.1602692569': obj.key,
	            'entry.913501581': obj.order,
	            'entry.551273632': obj.name,
	            'entry.1691809764': obj.cat,
	            'entry.596466268': obj.money,
	            'hl': 'zh-TW'
	        };
	    }).map(function (obj) {
	        var params = Object.keys(obj).filter(function (key) {
	            return obj[key] !== '' && obj[key] !== null;
	        }).map(function (key) {
	            return key + '=' + obj[key];
	        }).join('&');
	        return encodeURI(_actionTypes.PROXY_URL).replace('@URL@', encodeURIComponent(_actionTypes.UPLOAD_URL + params));
	    });
	    // console.log(requests)
	    return receiveSource(data);
	    return function (dispatch) {
	        // dispatch(requestSource())
	        return Promise.all([(0, _isomorphicFetch2.default)(_actionTypes.SOURCE_JSON).then(function (response) {
	            if (response.status >= 400) throw new Error("Bad response from server");
	            return response.json();
	        }).then(function (json) {
	            return json.feed.entry || [];
	        }).then(function (data) {
	            return data.map(function (member) {
	                return {
	                    key: member.gsx$sn.$t,
	                    order: '',
	                    name: member.gsx$姓名.$t,
	                    cat: member.gsx$男方女方親友.$t,
	                    cake: member.gsx$餅 ? member.gsx$餅.$t : '',
	                    table: member.gsx$桌次 ? member.gsx$桌次.$t : ''
	                };
	            });
	        }), (0, _isomorphicFetch2.default)(_actionTypes.TARGET_JSON).then(function (response) {
	            if (response.status >= 400) throw new Error("Bad response from server");
	            return response.json();
	        }).then(function (json) {
	            return json.feed.entry || [];
	        }).then(function (data) {
	            return data.map(function (member) {
	                return {
	                    key: member.gsx$sn.$t,
	                    order: member.gsx$順序.$t,
	                    name: member.gsx$姓名.$t,
	                    cat: member.gsx$男方女方親友.$t,
	                    money: member.gsx$禮金.$t,
	                    upload: true
	                };
	            });
	        })]).then(function (pObj) {
	            var data = [].concat(_toConsumableArray(pObj[0].map(function (item0) {
	                return Object.assign({}, item0, pObj[1].find(function (item1) {
	                    return item1.key === item0.key;
	                }));
	            })), _toConsumableArray(pObj[1].map(function (item) {
	                return item.key;
	            }).filter(function (key) {
	                return !new Set(pObj[0].map(function (item) {
	                    return item.key;
	                })).has(key);
	            }) // Get missing parts(keys) from target source
	            .map(function (key) {
	                return pObj[1].find(function (item) {
	                    return item.key === key;
	                });
	            }))). // Get missing parts(entire obj)
	            sort(function (a, b) {
	                return parseInt(a.key, 10) - parseInt(b.key, 10);
	            });
	            dispatch(receiveSource(data));
	        }).catch(function (reason) {
	            dispatch(receiveFail(reason));
	        });
	    };
	}

	function setLocalStorage(data) {
	    localStorage.setItem("guestData", JSON.stringify(data));
	}

	function clearLocalStorage() {
	    localStorage.clear();
	    return function (dispatch) {
	        dispatch(fetchData());
	    };
	}

	function toggleShowAll() {
	    return {
	        type: _actionTypes.TOGGLE_SHOW_ALL
	    };
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(34);
	module.exports = self.fetch.bind(self);


/***/ },
/* 34 */
/***/ function(module, exports) {

	(function() {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this._initBody(bodyInit)
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return;
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})();


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SHEET_URL = exports.SHEET_URL = 'https://docs.google.com/spreadsheets/d/1QCmCLZRLQVAreONM6tWjI4P1YEYoW5sqvxEdiCL-inE/edit#gid=1460813619';
	var SOURCE_JSON = exports.SOURCE_JSON = 'https://spreadsheets.google.com/feeds/list/14ly_hpAb4y2Zp7uQi6FFaUUf3rzZ3Ey1R5lWSZw37ls/1/public/values?alt=json';
	var TARGET_JSON = exports.TARGET_JSON = 'https://spreadsheets.google.com/feeds/list/1QCmCLZRLQVAreONM6tWjI4P1YEYoW5sqvxEdiCL-inE/1/public/values?alt=json';
	var PROXY_URL = exports.PROXY_URL = 'https://query.yahooapis.com/v1/public/yql?q=select * from html where url="@URL@"&format=xml\'&callback=?';
	var UPLOAD_URL = exports.UPLOAD_URL = 'https://docs.google.com/forms/d/147KkPqWY_h4-caZOuuvQ4UVW9JHPt6zt4Ttf6AtiBZQ/formResponse?';

	var GET_DATA = exports.GET_DATA = 'GET_DATA';
	var GET_DATA_SUCCESS = exports.GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
	var GET_DATA_FAIL = exports.GET_DATA_FAIL = 'GET_DATA_FAIL';

	var INSERT_DATA = exports.INSERT_DATA = 'INSERT_DATA';
	var SAVE_MONEY = exports.SAVE_MONEY = 'SAVE_MONEY';
	var SAVE_ORDER = exports.SAVE_ORDER = 'SAVE_ORDER';

	var TOGGLE_SHOW_ALL = exports.TOGGLE_SHOW_ALL = 'TOGGLE_SHOW_ALL';

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(21);

	var _reduxThunk = __webpack_require__(37);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(38);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reducer = __webpack_require__(39);

	var _reducer2 = _interopRequireDefault(_reducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var loggerMiddleware = (0, _reduxLogger2.default)();

	var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware)(_redux.createStore);

	function configureStore(initialState) {
	    return createStoreWithMiddleware(_reducer2.default, initialState);
	}

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = thunkMiddleware;

	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	var formatTime = function formatTime(time) {
	  return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string} options.level - console[level]
	 * @property {bool} options.duration - print duration of each action?
	 * @property {bool} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        var _options$level = options.level;
	        var level = _options$level === undefined ? "log" : _options$level;
	        var _options$logger = options.logger;
	        var logger = _options$logger === undefined ? window.console : _options$logger;
	        var collapsed = options.collapsed;
	        var predicate = options.predicate;
	        var _options$duration = options.duration;
	        var duration = _options$duration === undefined ? false : _options$duration;
	        var _options$timestamp = options.timestamp;
	        var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	        var transformer = options.transformer;
	        var _options$stateTransfo = options.stateTransformer;
	        var // deprecated
	        stateTransformer = _options$stateTransfo === undefined ? function (state) {
	          return state;
	        } : _options$stateTransfo;
	        var _options$actionTransf = options.actionTransformer;
	        var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	          return actn;
	        } : _options$actionTransf;
	        var _options$colors = options.colors;
	        var colors = _options$colors === undefined ? {
	          prevState: function prevState() {
	            return "#9E9E9E";
	          },
	          action: function action() {
	            return "#03A9F4";
	          },
	          nextState: function nextState() {
	            return "#4CAF50";
	          }
	        } : _options$colors;

	        // exit if console undefined

	        if (typeof logger === "undefined") {
	          return next(action);
	        }

	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        if (transformer) {
	          console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	        }

	        var started = timer.now();
	        var prevState = stateTransformer(getState());

	        var formattedAction = actionTransformer(action);
	        var returnedValue = next(action);

	        var took = timer.now() - started;
	        var nextState = stateTransformer(getState());

	        // message
	        var time = new Date();
	        var isCollapsed = typeof collapsed === "function" ? collapsed(getState, action) : collapsed;

	        var formattedTime = formatTime(time);
	        var title = "action " + formattedAction.type + (timestamp && formattedTime) + (duration && " in " + took.toFixed(2) + " ms");

	        // render
	        try {
	          if (isCollapsed) {
	            logger.groupCollapsed(title);
	          } else {
	            logger.group(title);
	          }
	        } catch (e) {
	          logger.log(title);
	        }

	        if (colors) {
	          logger[level]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);
	          logger[level]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);
	          logger[level]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);
	        } else {
	          logger[level]("prev state", prevState);
	          logger[level]("action", formattedAction);
	          logger[level]("next state", nextState);
	        }

	        try {
	          logger.groupEnd();
	        } catch (e) {
	          logger.log("—— log end ——");
	        }

	        return returnedValue;
	      };
	    };
	  };
	}

	exports.default = createLogger;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(21);

	var _actionTypes = __webpack_require__(35);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var overallState = {
	    data: [],
	    cat: [],
	    isLoading: false,
	    error: ''
	};
	var dataState = {
	    key: '',
	    order: 0,
	    name: '',
	    cat: '',
	    cake: '',
	    table: '',
	    money: '',
	    upload: false
	};

	function overallReducer() {
	    var _Math, _Math2, _Math3;

	    var state = arguments.length <= 0 || arguments[0] === undefined ? overallState : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actionTypes.GET_DATA:
	            return _extends({}, state, {
	                isLoading: true,
	                error: ''
	            });
	        case _actionTypes.GET_DATA_SUCCESS:
	            return _extends({}, state, {
	                isLoading: false,
	                data: action.data,
	                cat: action.cat,
	                error: ''
	            });
	        case _actionTypes.GET_DATA_FAIL:
	            return _extends({}, state, {
	                isLoading: false,
	                error: action.error
	            });
	        case _actionTypes.INSERT_DATA:
	            return _extends({}, state, {
	                data: [].concat(_toConsumableArray(state.data), [dataAction(void 0, _extends({}, action, {
	                    key: (_Math = Math).max.apply(_Math, _toConsumableArray(state.data.map(function (item) {
	                        return parseInt(item.key || 0, 10);
	                    }))),
	                    maxOrder: (_Math2 = Math).max.apply(_Math2, _toConsumableArray(state.data.map(function (item) {
	                        return parseInt(item.order || 0, 10);
	                    })))
	                }))])
	            });
	        case _actionTypes.SAVE_MONEY:
	        case _actionTypes.SAVE_ORDER:
	            var index = state.data.findIndex(function (item) {
	                return item.key === action.key;
	            });
	            return _extends({}, state, {
	                data: [].concat(_toConsumableArray(state.data.slice(0, index)), [dataAction(state.data[index], _extends({}, action, {
	                    maxOrder: (_Math3 = Math).max.apply(_Math3, _toConsumableArray(state.data.map(function (item) {
	                        return parseInt(item.order || 0, 10);
	                    })))
	                }))], _toConsumableArray(state.data.slice(index + 1)))
	            });
	        default:
	            return state;
	    }
	}
	function dataAction() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? dataState : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actionTypes.INSERT_DATA:
	            return _extends({}, state, {
	                key: action.key + 1 + '',
	                order: action.maxOrder + 1,
	                name: action.name,
	                cat: action.cat,
	                money: action.money
	            });
	        case _actionTypes.SAVE_MONEY:
	            return action.money ? _extends({}, state, {
	                money: action.money,
	                order: state.order ? state.order : action.maxOrder + 1
	            }) : state;
	        case _actionTypes.SAVE_ORDER:
	            return _extends({}, state, {
	                order: action.order
	            });
	        default:
	            return state;
	    }
	}

	var uiState = {
	    showAll: true
	};
	function uiReducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? uiState : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case _actionTypes.TOGGLE_SHOW_ALL:
	            return _extends({}, state, {
	                showAll: !state.showAll
	            });
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    overallReducer: overallReducer,
	    uiReducer: uiReducer
	});
	exports.default = rootReducer;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(13);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(14);

	var _actionTypes = __webpack_require__(35);

	var _action = __webpack_require__(32);

	var _jBarcode = __webpack_require__(42);

	var _jBarcode2 = _interopRequireDefault(_jBarcode);

	var _RoundProgress = __webpack_require__(43);

	var _RoundProgress2 = _interopRequireDefault(_RoundProgress);

	var _AppAction = __webpack_require__(44);

	var _AppAction2 = _interopRequireDefault(_AppAction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ENTER_KEY_CODE = 13;
	var TAB_KEY_CODE = 9;

	/**
	 * <Spreadsheet />
	 */

	var Spreadsheet = (function (_Component) {
	    _inherits(Spreadsheet, _Component);

	    function Spreadsheet(props) {
	        _classCallCheck(this, Spreadsheet);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Spreadsheet).call(this, props));

	        _this.state = {
	            openCloud: false,
	            openUpload: false,
	            openPwd: sessionStorage.getItem("password") === null ? true : false,
	            readOnly: false
	        };
	        return _this;
	    }

	    _createClass(Spreadsheet, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            // AppStore.on('change:uploadVal', function(value) {
	            //     this.setState({
	            //         openUpload: true
	            //     });
	            //     this.progress.setValue(value * 100);
	            // }.bind(this));
	            var dispatch = this.props.dispatch;

	            dispatch((0, _action.fetchData)());

	            this.progress = new _RoundProgress2.default(this.refs.progress, {
	                "displayGearwheel": false,
	                "radius": 200, // any integer
	                "lineWidth": 30, // any integer
	                "lineCap": "round", // each end style of the line. "round", "butt", or "square", default "butt"
	                "max": 100,
	                "value": 0,
	                "interval": 500,
	                "bgStyle": "gradient", // "gradient" or "image", defualt: "gradient"
	                "bgGradientTop": "#28cfbb", // if bgStyle is "gradient" then necessary
	                "bgGradientDown": "#45BBE6", // if bgStyle is "gradient" then necessary
	                "animateStyle": "easeInOutQuad" }). // specifies the speed curve of the animation. "liner" or "easeInOutQuad", defualt: "liner"
	            on("change", function (value) {
	                $(_this2.refs.progressLabel).text(Math.min(parseInt(value, 10), 100) + '%');
	            }).on("complete", function () {
	                _this2.setState({
	                    openUpload: false
	                });
	                _this2.progress.setValue(0);
	            });

	            if (this.state.openPwd) {
	                setTimeout(function () {
	                    _this2.refs.pwd.focus();
	                }, 0);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var money_barcode_smaller = [];
	            var money_barcode_bigger = [];
	            var moneyList = [1000, 1200, 1600, 1800, 2000, 2200, 2600, 2800, 3000, 3200, 3600, 3800, 5000, 6000, 6600, 8000, 10000, 12000];
	            var sum = 0;
	            for (var i = 0, len = moneyList.length; i < len; i += 1) {
	                var jsx = _react2.default.createElement(
	                    'div',
	                    { key: i },
	                    _react2.default.createElement(Barcode, { code: moneyList[i] }),
	                    _react2.default.createElement(
	                        'span',
	                        null,
	                        ' ',
	                        moneyList[i]
	                    )
	                );
	                if (i < len / 2) {
	                    money_barcode_smaller.push(jsx);
	                } else {
	                    money_barcode_bigger.push(jsx);
	                }
	            }
	            for (var i = 0, len = this.props.data.length; i < len; i += 1) {
	                sum += parseInt(this.props.data[i].money, 10) || 0;
	            }

	            return _react2.default.createElement(
	                'div',
	                { className: 'spread-sheet' },
	                _react2.default.createElement(
	                    'h1',
	                    { className: 'title no-print' },
	                    'Wilson & Effie 婚禮賓客名單',
	                    sum === 0 ? '' : ' (' + sum + ')'
	                ),
	                _react2.default.createElement(
	                    'table',
	                    { className: 'money-list sheet-table' },
	                    _react2.default.createElement(
	                        'tbody',
	                        null,
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                money_barcode_smaller
	                            ),
	                            _react2.default.createElement(
	                                'td',
	                                null,
	                                money_barcode_bigger
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(Sheetlist, _extends({}, this.props, { readOnly: this.state.readOnly })),
	                _react2.default.createElement(
	                    'div',
	                    { onClick: function onClick(e) {
	                            return _this3._openCloud(e);
	                        }, title: '點一下離開', className: 'block-page no-print' + (this.state.openCloud ? ' open' : '') },
	                    _react2.default.createElement('iframe', { className: 'cloud-iframe', ref: 'cloudFrame' }),
	                    _react2.default.createElement(
	                        'button',
	                        { onClick: function onClick(e) {
	                                return _this3._openCloud(e);
	                            }, className: 'no-print btn-open-block', disabled: this.state.readOnly ? true : false },
	                        '雲端'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'block-page no-print' + (this.state.openUpload ? ' open' : '') },
	                    _react2.default.createElement(
	                        'div',
	                        { ref: 'progress' },
	                        _react2.default.createElement('span', { ref: 'progressLabel' })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'block-page no-print' + (this.state.openPwd ? ' open' : '') },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'pwd-block' },
	                        '密碼：',
	                        _react2.default.createElement('input', { type: 'password', onKeyDown: function onKeyDown(e) {
	                                return _this3._enter(e);
	                            }, ref: 'pwd' })
	                    )
	                )
	            );
	        }
	    }, {
	        key: '_openCloud',
	        value: function _openCloud() {
	            if (!this.refs.cloudFrame.src) {
	                this.refs.cloudFrame.src = _actionTypes.SHEET_URL;
	            }
	            this.setState({
	                openCloud: !this.state.openCloud
	            });
	        }
	    }, {
	        key: '_enter',
	        value: function _enter(event) {
	            if (event.keyCode === ENTER_KEY_CODE) {
	                sessionStorage.setItem("password", event.target.value);
	                this.setState({
	                    openPwd: false,
	                    readOnly: sessionStorage.getItem("password") === "9527" ? false : true
	                });
	            }
	        }
	    }]);

	    return Spreadsheet;
	})(_react.Component);

	/**
	 * <Sheetlist data={data} />
	 */

	var Sheetlist = (function (_Component2) {
	    _inherits(Sheetlist, _Component2);

	    function Sheetlist(props) {
	        _classCallCheck(this, Sheetlist);

	        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Sheetlist).call(this, props));

	        _this4.state = {
	            find: '',
	            focus: ''
	        };
	        return _this4;
	    }

	    _createClass(Sheetlist, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this._onFocusSearch();
	        }
	        // shouldComponentUpdate(nextProps, nextState) {
	        //     return nextState.find !== this.state.find ||
	        //         nextState.showAll !== this.state.showAll ||
	        //         nextState.focus !== this.state.focus ||
	        //         nextProps.data !== this.props.data ||
	        //         nextProps.readOnly !== this.props.readOnly
	        // }

	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this._focusSearch();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this5 = this;

	            var rows = this.props.data.map(function (row) {
	                var find = _this5.state.find && (_this5.state.find === row.key || row.name.toLowerCase().search(_this5.state.find.toLowerCase()) > -1 || row.name.toUpperCase().search(_this5.state.find.toUpperCase()) > -1);
	                // <td><Barcode code={row.key}/></td>
	                return _react2.default.createElement(
	                    'tr',
	                    { key: row.key, className: 'sheet-row' + (_this5.props.showAll || find ? '' : ' hide') + (find ? ' find' : ''), ref: row.key, 'data-money_key': 'money_' + row.key },
	                    _react2.default.createElement(
	                        'td',
	                        { className: 'td-for-barcode' },
	                        _react2.default.createElement(Barcode, { code: row.key }),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'note' },
	                            '此條碼為賓客代號',
	                            _react2.default.createElement('br', null),
	                            '建議貼於紅包背面'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        { 'data-th': '編號', className: 'center' },
	                        row.key
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        { 'data-th': '名字' },
	                        row.name
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        { 'data-th': '分類', className: 'no-print' },
	                        row.cat
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        { 'data-th': '桌次', className: 'no-print center' + (row.table !== parseInt(row.key / 100, 10).toString() ? ' heightlight' : '') },
	                        row.table
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        { className: 'no-print center no-mobile' },
	                        row.cake ? '餅' : ''
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        { className: 'no-print center no-mobile' },
	                        _react2.default.createElement(RowInput, { type: 'money', datakey: row.key, value: row.money ? row.money : '', ref: 'money_' + row.key, focusToSearch: function focusToSearch() {
	                                return _this5._onFocusSearch();
	                            }, clearFocus: function clearFocus() {
	                                return _this5._onClearFocus();
	                            }, upload: row.upload ? true : false, placeholder: '禮金', disabled: _this5.props.readOnly ? true : false, dispatch: _this5.props.dispatch })
	                    ),
	                    _react2.default.createElement(
	                        'td',
	                        { className: 'no-print center no-mobile' },
	                        _react2.default.createElement(RowInput, { type: 'order', datakey: row.key, value: row.order ? row.order : '', ref: 'order_' + row.key, focusToSearch: function focusToSearch() {
	                                return _this5._onFocusSearch();
	                            }, clearFocus: function clearFocus() {
	                                return _this5._onClearFocus();
	                            }, upload: row.upload ? true : false, placeholder: '順序', disabled: _this5.props.readOnly ? true : false, dispatch: _this5.props.dispatch })
	                    )
	                );
	            });
	            return _react2.default.createElement(
	                'div',
	                { className: 'sheet-list' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'no-print search-bar' },
	                    '編號/姓名搜尋： ',
	                    _react2.default.createElement('input', { type: 'text', onKeyDown: function onKeyDown(e) {
	                            return _this5._enter(e);
	                        }, ref: 'txtSearch' }),
	                    ' ',
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'chk-block' },
	                        _react2.default.createElement('input', { type: 'checkbox', id: 'chkShowAll', onChange: function onChange(e) {
	                                return _this5._showAll(e);
	                            }, checked: this.props.showAll }),
	                        _react2.default.createElement(
	                            'label',
	                            { htmlFor: 'chkShowAll' },
	                            '顯示全部'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'no-print button-bar' },
	                    _react2.default.createElement(
	                        'button',
	                        { className: 'btn-refresh', onClick: function onClick(e) {
	                                return _this5._clear(e);
	                            } },
	                        '重整'
	                    ),
	                    _react2.default.createElement(
	                        'button',
	                        { className: 'no-mobile', onClick: function onClick(e) {
	                                return _this5._clear(e);
	                            }, disabled: this.props.readOnly ? true : false },
	                        '清除本機暫存'
	                    ),
	                    _react2.default.createElement(
	                        'button',
	                        { className: 'no-mobile', onClick: function onClick(e) {
	                                return _this5._upload(e);
	                            }, disabled: this.props.readOnly ? true : false, ref: 'upload' },
	                        '上傳到雲端'
	                    ),
	                    _react2.default.createElement(
	                        'button',
	                        { className: 'no-mobile', onClick: function onClick(e) {
	                                return _this5._print(e);
	                            }, disabled: this.props.readOnly ? true : false },
	                        '列印條碼'
	                    )
	                ),
	                _react2.default.createElement(
	                    'table',
	                    { className: 'sheet-table' },
	                    _react2.default.createElement(
	                        'tbody',
	                        null,
	                        _react2.default.createElement(
	                            'tr',
	                            { className: 'sheet-row no-print' },
	                            _react2.default.createElement(
	                                'th',
	                                { style: { width: '100px' } },
	                                '編號'
	                            ),
	                            _react2.default.createElement(
	                                'th',
	                                null,
	                                '名字'
	                            ),
	                            _react2.default.createElement(
	                                'th',
	                                null,
	                                '分類'
	                            ),
	                            _react2.default.createElement(
	                                'th',
	                                { style: { width: '50px' } },
	                                '桌次'
	                            ),
	                            _react2.default.createElement(
	                                'th',
	                                { className: 'no-mobile', style: { width: '50px' } },
	                                '喜餅'
	                            ),
	                            _react2.default.createElement(
	                                'th',
	                                { className: 'no-mobile', style: { width: '110px' } },
	                                '禮金'
	                            ),
	                            _react2.default.createElement(
	                                'th',
	                                { className: 'no-mobile', style: { width: '110px' } },
	                                '順序'
	                            )
	                        ),
	                        _react2.default.createElement(NewRow, { ref: 'newRow', cat: this.props.cat, readOnly: this.props.readOnly, dispatch: this.props.dispatch }),
	                        rows
	                    )
	                )
	            );
	        }
	    }, {
	        key: '_enter',
	        value: function _enter(event) {
	            if (event.keyCode === ENTER_KEY_CODE) {
	                this._search(event.target.value);
	            }
	        }
	    }, {
	        key: '_search',
	        value: function _search(value) {
	            var val = value.trim();
	            var find = this.props.data.find(function (obj) {
	                return obj.key == val || val && obj.name.toLowerCase().search(val.toLowerCase()) > -1 || val && obj.name.toUpperCase().search(val.toUpperCase()) > -1;
	            });
	            if (find) {
	                this.setState({
	                    find: val,
	                    focus: 'money_' + find.key
	                });
	            } else {
	                this.setState({
	                    find: '',
	                    focus: 'txtSearch'
	                });
	                this.refs.txtSearch.focus();
	                this.refs.txtSearch.select();
	            }
	        }
	    }, {
	        key: '_showAll',
	        value: function _showAll(event) {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _action.toggleShowAll)());
	        }
	    }, {
	        key: '_focusSearch',
	        value: function _focusSearch() {
	            var _this6 = this;

	            var node = _reactDom2.default.findDOMNode(this.refs[this.state.focus]) || this.refs[this.state.focus];
	            if (node) {
	                if (node.disabled) {
	                    var find = this.props.data.find(function (row) {
	                        return _this6.state.find && (_this6.state.find === row.key || row.name.search(_this6.state.find) > -1) && _this6.refs['money_' + row.key].disabled === false;
	                    });
	                    if (find) {
	                        _reactDom2.default.findDOMNode(this.refs['money_' + find.key]).focus();
	                        _reactDom2.default.findDOMNode(this.refs['money_' + find.key]).select();
	                    } else {
	                        this.setState({
	                            focus: 'txtSearch'
	                        });
	                    }
	                } else {
	                    node.focus();
	                    node.select();
	                }
	            }
	        }
	    }, {
	        key: '_onFocusSearch',
	        value: function _onFocusSearch() {
	            this.setState({
	                focus: 'txtSearch'
	            });
	        }
	    }, {
	        key: '_onClearFocus',
	        value: function _onClearFocus() {
	            this.setState({
	                focus: ''
	            });
	        }
	    }, {
	        key: '_clear',
	        value: function _clear() {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _action.clearLocalStorage)());
	        }
	    }, {
	        key: '_upload',
	        value: function _upload() {
	            var _this7 = this;

	            var disabledBtn = function disabledBtn() {
	                _this7.refs.upload.disabled = true;
	            };
	            var enableBtn = function enableBtn() {
	                _this7.refs.upload.disabled = false;
	            };
	            var _props = this.props;
	            var dispatch = _props.dispatch;
	            var data = _props.data;

	            dispatch((0, _action.pushToCloud)(data));
	            // AppAction.pushToCloud(disabledBtn, enableBtn);
	        }
	    }, {
	        key: '_print',
	        value: function _print() {
	            window.print();
	        }
	    }]);

	    return Sheetlist;
	})(_react.Component);

	var NewRow = (function (_Component3) {
	    _inherits(NewRow, _Component3);

	    function NewRow() {
	        _classCallCheck(this, NewRow);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NewRow).apply(this, arguments));
	    }

	    _createClass(NewRow, [{
	        key: 'render',
	        value: function render() {
	            var _this9 = this;

	            var options = this.props.cat.map(function (name, i) {
	                return _react2.default.createElement(
	                    'option',
	                    { key: 'ddlCat_' + i, value: name },
	                    name
	                );
	            });
	            return _react2.default.createElement(
	                'tr',
	                { className: this.props.readOnly ? 'sheet-row no-print no-mobile hidden' : 'sheet-row no-print no-mobile' },
	                _react2.default.createElement(
	                    'td',
	                    { className: 'center' },
	                    _react2.default.createElement(
	                        'button',
	                        { onClick: function onClick(e) {
	                                return _this9._save(e);
	                            } },
	                        '新增'
	                    )
	                ),
	                _react2.default.createElement(
	                    'td',
	                    null,
	                    _react2.default.createElement('input', { type: 'text', ref: 'txtName', placeholder: '姓名' })
	                ),
	                _react2.default.createElement(
	                    'td',
	                    null,
	                    _react2.default.createElement(
	                        'select',
	                        { ref: 'ddlCat' },
	                        _react2.default.createElement(
	                            'option',
	                            { value: '' },
	                            '請選擇類別'
	                        ),
	                        options
	                    )
	                ),
	                _react2.default.createElement('td', null),
	                _react2.default.createElement('td', null),
	                _react2.default.createElement(
	                    'td',
	                    { className: 'center' },
	                    _react2.default.createElement('input', { type: 'text', ref: 'txtMoney', placeholder: '禮金' })
	                ),
	                _react2.default.createElement('td', null)
	            );
	        }
	    }, {
	        key: '_save',
	        value: function _save() {
	            if (this.refs.txtName.value && this.refs.ddlCat.value && this.refs.txtMoney.value) {
	                var dispatch = this.props.dispatch;

	                dispatch((0, _action.insertData)(this.refs.txtName.value, this.refs.ddlCat.value, this.refs.txtMoney.value));
	                this.refs.txtName.value = '';
	                this.refs.ddlCat.value = '';
	                this.refs.txtMoney.value = '';
	            } else {
	                alert('請填妥所有欄位');
	            }
	        }
	    }]);

	    return NewRow;
	})(_react.Component);

	/**
	 * <Barcode code={barcode} />
	 * http://jquery-barcode.googlecode.com/svn/trunk/jquery-barcode/demo/demo.html
	 */

	var Barcode = (function (_Component4) {
	    _inherits(Barcode, _Component4);

	    function Barcode() {
	        _classCallCheck(this, Barcode);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Barcode).apply(this, arguments));
	    }

	    _createClass(Barcode, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            $(this.refs.barcode).barcode({
	                code: 'code39'
	            });
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            return nextProps.code !== this.props.code;
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            $(this.refs.barcode).barcode({
	                code: 'code39'
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'span',
	                { ref: 'barcode', className: 'bar-code' },
	                this.props.code
	            );
	        }
	    }]);

	    return Barcode;
	})(_react.Component);

	var RowInput = (function (_Component5) {
	    _inherits(RowInput, _Component5);

	    function RowInput(props) {
	        _classCallCheck(this, RowInput);

	        var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(RowInput).call(this, props));

	        _this11.state = {
	            value: _this11.props.value || ''
	        };
	        return _this11;
	    }

	    _createClass(RowInput, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (nextProps.value != this.props.value) {
	                this.setState({
	                    value: nextProps.value
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this12 = this;

	            return _react2.default.createElement('input', {
	                type: 'text',
	                className: this.props.className,
	                placeholder: this.props.placeholder,
	                disabled: this.props.upload || this.props.disabled ? true : false,
	                onBlur: function onBlur(e) {
	                    return _this12._save(e);
	                },
	                onChange: function onChange(e) {
	                    return _this12._onChange(e);
	                },
	                onKeyDown: function onKeyDown(e) {
	                    return _this12._onKeyDown(e);
	                },
	                value: this.state.value
	            });
	        }
	    }, {
	        key: '_save',
	        value: function _save() {
	            if (this.state.value) {
	                this.props.clearFocus();
	                var dispatch = this.props.dispatch;

	                switch (this.props.type) {
	                    case 'money':
	                        dispatch((0, _action.saveMoney)(this.props.datakey, this.state.value));
	                        return;
	                    case 'order':
	                        dispatch((0, _action.saveOrder)(this.props.datakey, this.state.value));
	                        return;
	                }
	            }
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange(event) {
	            this.setState({
	                value: event.target.value
	            });
	        }
	    }, {
	        key: '_onKeyDown',
	        value: function _onKeyDown(event) {
	            if (event.target.value) {
	                switch (event.keyCode) {
	                    case ENTER_KEY_CODE:
	                        this.props.focusToSearch();
	                        break;
	                    case TAB_KEY_CODE:
	                        this.props.clearFocus();
	                        break;
	                }
	            }
	        }
	    }]);

	    return RowInput;
	})(_react.Component);

	RowInput.propTypes = {
	    datakey: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    id: _react.PropTypes.string,
	    placeholder: _react.PropTypes.string,
	    // value: PropTypes.string,
	    upload: _react.PropTypes.bool
	};

	function mapStateToProps(state) {
	    return {
	        data: state.overallReducer.data,
	        cat: state.overallReducer.cat,
	        showAll: state.uiReducer.showAll
	    };
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Spreadsheet);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ },
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fluxify = __webpack_require__(45);

	var _fluxify2 = _interopRequireDefault(_fluxify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Actions = {
		save: function save(type, key, val) {
			var action = {
				money: 'SAVE_MONEY',
				order: 'SAVE_ORDER'
			};
			_fluxify2.default.doAction({
				actionType: action[type],
				key: key,
				val: val
			});
		},
		insert: function insert(name, cat, money) {
			_fluxify2.default.doAction({
				actionType: 'INSERT_NEW_DATA',
				name: name,
				cat: cat,
				money: money
			});
		},
		loadFromServer: function loadFromServer() {
			_fluxify2.default.doAction({
				actionType: 'LOAD_FROM_SERVER'
			});
		},
		clearLocalStorage: function clearLocalStorage() {
			_fluxify2.default.doAction({
				actionType: 'CLEAR_LOCAL_STORAGE'
			});
		},
		pushToCloud: function pushToCloud(before, after) {
			_fluxify2.default.doAction({
				actionType: 'PUSH_TO_CLOUD',
				beforeFunc: before,
				afterFunc: after
			});
		}
	};

	module.exports = Actions;

/***/ }
]);