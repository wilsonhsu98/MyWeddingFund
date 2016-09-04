require.config({
	baseUrl: "scripts/",

	paths: {
		// Libs
		jquery: '../lib/jquery/jquery-1.11.2.min',
		underscore: '../lib/underscore/underscore-min',
		router: '../lib/router/director.min',

		// React
		react: '../lib/react/react-with-addons.min',
		JSXTransformer: '../lib/react/JSXTransformer',
		jsx: '../lib/react/jsx',
		fluxify: '../lib/fluxify/fluxify.min',

		// RequireJS Plugin
		async: '../lib/require/async',
		text: '../lib/require/text',
		json: '../lib/require/json',
		image: '../lib/require/image',

		jBarcode: '../lib/jquery/jquery.barcode.0.3',
		RoundProgress: '../lib/ui/RoundProgress'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		router: {
			exports: 'Router'
		},
		jBarcode: {
			deps: ['jquery'],
			exports: 'jBarcode'
		},
		RoundProgress: {
			deps: ['jquery'],
			exports: 'RoundProgress'
		}
	},
	jsx: {
		fileExtension: '.jsx',
		harmony: true,
		stripTypes: true
	}
});

require([

	'jquery',
	'router',
	'react',
	// 'jsx!react_cmpt/Timer',
	'jsx!react_cmpt/Spreadsheet'

], function(

	$,
	Router,
	React,
	// Timer,
	Spreadsheet

) {

	'use strict';

	var showAuthorInfo = function() {
		console.log("showAuthorInfo");
	};
	var listBooks = function() {
		console.log("listBooks");
	};
	var allroutes = function() {
		// new App;
		// var route = window.location.hash.slice(2);
		// var sections = $('section');
		// var section;

		// section = sections.filter('[data-route=' + route + ']');

		// if (section.length) {
		// 	sections.hide(250);
		// 	section.show(250);
		// }

		// var start = new Date(),
		// 	timer = React.createFactory(Timer);

		// // Mount the JSX component in the app container
		// React.render(
		// 	timer({
		// 		start: start
		// 	}),
		// 	document.getElementById('mainBody')
		// );
	};


	var router = new Router({
		'/author': showAuthorInfo,
		'/books': listBooks
	}).configure({
		on: allroutes
	});

	router.init();

	var spreadsheet = React.createFactory(Spreadsheet);
	React.render(
		spreadsheet({
			pollInterval: 2000
		}),
		document.getElementById('mainBody')
	);

	document.title = '收禮平台';
});
