define([

	'fluxify',
	'../dispatcher/AppDispatcher'

], function(

	flux,
	AppDispatcher

) {

	'use strict';

	var sourceUrl = 'https://spreadsheets.google.com/feeds/list/14ly_hpAb4y2Zp7uQi6FFaUUf3rzZ3Ey1R5lWSZw37ls/1/public/values?alt=json',
		targetUrl = 'https://spreadsheets.google.com/feeds/list/1QCmCLZRLQVAreONM6tWjI4P1YEYoW5sqvxEdiCL-inE/1/public/values?alt=json',
		proxyUrl = 'https://query.yahooapis.com/v1/public/yql?q=select * from html where url="@URL@"&format=xml\'&callback=?',
		uploadUrl = 'https://docs.google.com/forms/d/147KkPqWY_h4-caZOuuvQ4UVW9JHPt6zt4Ttf6AtiBZQ/formResponse?',
		rawData = [],
		// timestamp = function(dateString) {
		// 	var first = dateString.split(' ')[0],
		// 		second = dateString.split(' ')[1],
		// 		third = dateString.split(' ')[2],
		// 		d = new Date(
		// 			first.split('/')[0], parseInt(first.split('/')[1] - 1, 10), first.split('/')[2],
		// 			parseInt(third.split(':')[0], 10) + (second === '下午' ? 12 : 0), third.split(':')[1], third.split(':')[2]
		// 		);
		// 	return d.getTime()/1000;
		// },
		filterSource = function(nativeData) {
			var filterData = [];
			if (nativeData.feed.entry) {
				for (var i = 0; i < nativeData.feed.entry.length; i += 1) {
					filterData.push({
						// "key": timestamp(nativeData.feed.entry[i].gsx$sn.$t),
						key: nativeData.feed.entry[i].gsx$sn.$t,
						order: '',
						name: nativeData.feed.entry[i].gsx$姓名.$t,
						cat: nativeData.feed.entry[i].gsx$男方女方親友.$t,
						cake: nativeData.feed.entry[i].gsx$餅 ? nativeData.feed.entry[i].gsx$餅.$t : '',
						table: nativeData.feed.entry[i].gsx$桌次 ? nativeData.feed.entry[i].gsx$桌次.$t : ''
					});
				}
			}
			return filterData;
		},
		filterTarget = function(source, nativeData) {
			var filterData = [];
			if (nativeData.feed.entry) {
				for (var i = 0; i < nativeData.feed.entry.length; i += 1) {
					filterData.push({
						key: nativeData.feed.entry[i].gsx$sn.$t,
						order: nativeData.feed.entry[i].gsx$順序.$t,
						name: nativeData.feed.entry[i].gsx$姓名.$t,
						cat: nativeData.feed.entry[i].gsx$男方女方親友.$t,
						money: nativeData.feed.entry[i].gsx$禮金.$t
					});
				}
			}
			if (filterData.length) {
				for (var i = 0; i < filterData.length; i += 1) {
					var find = _.find(source, function(obj) {
						return obj.key == filterData[i].key;
					});
					if (find) {
						find.money = filterData[i].money;
						find.order = filterData[i].order;
						find.upload = true;
					} else {
						source.push({
							key: filterData[i].key,
							order: filterData[i].order,
							name: filterData[i].name,
							cat: filterData[i].cat,
							money: filterData[i].money,
							upload: true
						});
					}
				}
			}
			return source;
		};

	var AppStore = flux.createStore({
		id: 'appStore',
		initialState: {
			data: []
		},
		actionCallbacks: {
			loadFromServer: function(updater, afterFunc) {
				if (localStorage.getItem("guestData")) {
					rawData = JSON.parse(localStorage.getItem("guestData"));
					var cat = _.uniq(_.map(rawData, function(obj) { return obj.cat; }));
					updater.set({
						data: rawData,
						cat: cat
					});
					if (typeof afterFunc === 'function') afterFunc();
				} else {
					var source, target;
					$.when(
						$.ajax({
							url: sourceUrl,
							dataType: 'json',
							success: function(data) {
								console.log('first')
								source = data;
							},
							error: function(xhr, status, err) {
								console.error(sourceUrl, status, err.toString());
							}
						}),
						$.ajax({
							url: targetUrl,
							dataType: 'json',
							success: function(data) {
								console.log('second')
								target = data;
							},
							error: function(xhr, status, err) {
								console.error(targetUrl, status, err.toString());
							}
						})
					).then(function() {
						rawData = filterSource(source);
						rawData = filterTarget(rawData, target);

						var cat = _.uniq(_.map(rawData, function(obj) { return obj.cat; }));
						localStorage.setItem("guestData", JSON.stringify(rawData));
						updater.set({
							data: rawData,
							cat: cat
						});
						console.log('then')
						if (typeof afterFunc === 'function') afterFunc();
					});
				}
			},
			saveMoney: function(updater, key, money) {
				var find = _.find(rawData, function(obj) {
						return obj.key == key;
					}),
					maxOrder = _.max(rawData, function(obj){ return parseInt(obj.order, 10); });
				if (find) {
					if (money) {
						// console.log('SaveMoney:' + money);
						find.money = money;
						find.order = find.order ? find.order : ((parseInt(maxOrder.order, 10) || 0) + 1);
					} else {
						find.money = '';
						find.order = '';
					}
					localStorage.setItem("guestData", JSON.stringify(rawData));
					updater.set({
						data: _.clone(rawData)
					});
				}
			},
			saveOrder: function(updater, key, order) {
				var find = _.find(rawData, function(obj) {
					return obj.key == key;
				});
				if (find) {
					find.order = order;
					localStorage.setItem("guestData", JSON.stringify(rawData));
					updater.set({
						data: _.clone(rawData)
					});
				}
			},
			insertNewData: function(updater, name, cat, money) {
				var max = _.max(rawData, function(obj){ return parseInt(obj.key, 10); }),
					maxOrder = _.max(rawData, function(obj){ return parseInt(obj.order, 10); });
				rawData.push({
					key: parseInt(max.key, 10) + 1 + '',
					order: (parseInt(maxOrder.order, 10) || 0) + 1,
					name: name,
					cat: cat,
					money: money
				});
				localStorage.setItem("guestData", JSON.stringify(rawData));
				updater.set({
					data: _.clone(rawData)
				});
			},
			clearLocalStorage: function(updater, afterFunc) {
				localStorage.clear();
				flux.doAction('loadFromServer', afterFunc);
			},
			pushToCloud: function(updater, beforeFunc, afterFunc) {
				var params,
					count = 0,
					uploadRows = _.filter(updater.get('data'), function(obj) {
						return obj.money && !obj.upload;
					}),
					chkUpdate = function() {
						if (count === uploadRows.length) {
							var i = 1,
								timer = setInterval(function() {
									$.ajax({
										url: targetUrl,
										dataType: 'json',
										success: function(data) {
											data = filterSource(data);
											if (_.difference(_.pluck(uploadRows, 'key'), _.pluck(data, 'key')).length === 0) {
												flux.doAction('clearLocalStorage', afterFunc);
												clearInterval(timer);

												console.log('success');
												updater.set({
													uploadVal: count / uploadRows.length
												});
												console.log(count / uploadRows.length);
											}
										},
										error: function(xhr, status, err) {
											console.error(targetUrl, status, err.toString());
										},
										complete: function() {
											i += 1;
											if (i === 10) {
												clearInterval(timer);
												console.log('complete');
												updater.set({
													uploadVal: count / uploadRows.length
												});
											}
										}
									});
								}, 1000);
						} else {
							updater.set({
								uploadVal: count / uploadRows.length
							});
						}
					};
				if (uploadRows.length > 0 && typeof beforeFunc === 'function') beforeFunc();
				_.each(uploadRows, function(obj) {
					params = $.param({
						'entry.1602692569': obj.key,
						'entry.913501581': obj.order,
						'entry.551273632': obj.name,
						'entry.1691809764': obj.cat,
						'entry.596466268': obj.money,
						'hl': 'zh-TW'
					});

					$.ajax({
						url: encodeURI(proxyUrl).replace('@URL@', encodeURIComponent(uploadUrl + params)),
						type: 'GET',
						dataType: 'json',
						async: false,
						success: function(data) {
							if ($.trim($('.ss-resp-message', data.results[0]).text()) === '我們已經收到您回覆的表單。') {
								count += 1;
								chkUpdate();
							}
						},
						error: function(xhr, status, err) {
							console.error('[' + obj.key + '-' + obj.name + ']', status, err.toString());
						}
					});
				});
			}
		}
	});

	AppDispatcher.register(function(payload) {
		switch (payload.actionType) {
			case 'SAVE_MONEY':
				flux.doAction('saveMoney', payload.key, payload.val);
				break;
			case 'SAVE_ORDER':
				flux.doAction('saveOrder', payload.key, payload.val);
				break;
			case 'INSERT_NEW_DATA':
				flux.doAction('insertNewData', payload.name, payload.cat, payload.money);
				break;
			case 'LOAD_FROM_SERVER':
				flux.doAction('loadFromServer');
				break;
			case 'CLEAR_LOCAL_STORAGE':
				flux.doAction('clearLocalStorage');
				break;
			case 'PUSH_TO_CLOUD':
				flux.doAction('pushToCloud', payload.beforeFunc, payload.afterFunc);
				break;
		}
	});

	return AppStore;
});
