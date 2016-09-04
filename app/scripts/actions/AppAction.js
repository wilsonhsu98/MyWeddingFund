import flux from 'fluxify';

var Actions = {
	save: function(type, key, val) {
		var action = {
			money: 'SAVE_MONEY',
			order: 'SAVE_ORDER'
		};
		flux.doAction({
			actionType: action[type],
			key: key,
			val: val
		});
	},
	insert: function(name, cat, money) {
		flux.doAction({
			actionType: 'INSERT_NEW_DATA',
			name: name,
			cat: cat,
			money: money
		});
	},
	loadFromServer: function() {
		flux.doAction({
			actionType: 'LOAD_FROM_SERVER'
		});
	},
	clearLocalStorage: function() {
		flux.doAction({
			actionType: 'CLEAR_LOCAL_STORAGE'
		});
	},
	pushToCloud: function(before, after) {
		flux.doAction({
			actionType: 'PUSH_TO_CLOUD',
			beforeFunc: before,
			afterFunc: after
		});
	}
}

module.exports = Actions;
