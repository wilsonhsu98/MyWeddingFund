({
	appDir: "./scripts",
	baseUrl: "./",
	dir: "../pro/scripts",

	// call with `node r.js -o build.js`
	// add `optimize=none` to skip script optimization (useful during debugging).
	optimize: "none",

	paths: {
		// jquery: "../lib/jquery/jquery-1.11.2.min",
		// underscore: "../lib/underscore/underscore-min",
		// react: "../lib/react/react-with-addons.min"
	},

	mainConfigFile: "./scripts/main.js",

	stubModules: ["jsx"],

	modules: [{
		name: "main",
		exclude: ["JSXTransformer", "text"]
	}]
})
