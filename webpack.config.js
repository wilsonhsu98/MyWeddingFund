var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    cache: false,
    context: path.join(__dirname, "app"),
    entry: {
        app: ['./scripts/app.jsx'],
        vendors: []
    },
    output: {
        path: path.join(__dirname, "dist"),
        // publicPath: "dist/",
        filename: "bundle.js"
    },
    resolve: {
        alias: {},
        modulesDirectories: ["app/lib", "node_modules"],
        extensions: ['', '.js', '.jsx', '.scss']
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new HtmlWebpackPlugin({
            title: 'My project',
            template: __dirname + '/app/index.html',
            inject: 'body'
        })
    ],
    module: {
        noParse: [/react-with-addons/],
        loaders: [
            { test: /\.js[x]?$/, exclude: /(node_modules|app\/lib)/, loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0' },
            { test: /\.scss$/, loader: "style!css!sass?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib") },
            // { test: /\.png$/, loader: "url-loader?limit=100000" },
            // { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    addVendor: function (name, path, loader) {
        this.resolve.alias[name] = path;
        this.entry.vendors.push(name);
        if (loader) {
            if (loader !== true) this.module.loaders.push({test: new RegExp(path), loader: loader});
        } else {
            this.module.noParse.push(new RegExp(path));
        }
    }
};

var lib_dir = __dirname + "/app/lib/",
    vendors = {
        // Libs
        jquery: {path: 'jquery/jquery-1.11.2.min'},

        // React
        react: {path: 'react/react-with-addons'},
        'react-dom': {path: 'react/react-dom.min', loader: true},

        // jQuery component
        jBarcode: {path: 'jquery/jquery.barcode.0.3', loader: 'imports?jQuery=jquery'},
        RoundProgress: {path: 'ui/RoundProgress', loader: 'imports?$=jquery'}
    };

for (var item in vendors) {
    config.addVendor(item, lib_dir + vendors[item].path, vendors[item].loader);
}

module.exports = config;