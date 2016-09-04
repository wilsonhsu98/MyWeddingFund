var gulp = require('gulp'),
    shell = require("gulp-shell"),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence'),
    // jshint = require('gulp-jshint'),
    // uglify = require('gulp-uglify'),
    // concat = require('gulp-concat'),
    // del = require('del'),
    htmlReplace = require('gulp-html-replace'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify');

gulp.task('server-dev', function() {
    return connect.server({
        root: 'dev',
        livereload: true,
        port: 8080,
        fallback: 'dev/index.html'
    });
});

gulp.task('server-pro', function() {
    return connect.server({
        root: 'pro',
        livereload: true,
        port: 8080,
        fallback: 'pro/index.html'
    });
});

gulp.task('rjs', shell.task(['r.js.cmd -o dev/rjs_build.js']));

gulp.task('styles-dev', function() {
    return sass('dev/styles/scss/main.scss', {
            style: 'expanded',
            compass: true
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dev/styles/css'));
});

gulp.task('styles-pro', function() {
    return sass('dev/styles/scss/main.scss', {
            style: 'expanded',
            compass: true
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('pro/styles/css'));
});

gulp.task('images-pro', function() {
    return gulp.src('dev/styles/img/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('pro/styles/img'));
});

gulp.task('html', function() {
    return gulp.src('dev/index.html')
        .pipe(htmlReplace({
            'css': 'styles/css/main.min.css',
            'js': {
                src: [
                    ['scripts/main', 'lib/require/require.min.js']
                ],
                tpl: '<script data-main="%s" src="%s"></script>'
            }
        }))
        .pipe(gulp.dest('pro'));
});

gulp.task('libs', function() {
    return gulp.src('dev/lib/**/*.js')
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        .pipe(gulp.dest('pro/lib'));
    // .pipe(rename({
    //     suffix: '.min'
    // }))
    // .pipe(uglify())
    // .pipe(gulp.dest('dist/scripts'))
});

gulp.task('clean', function() {
    cache.clearAll();
    return gulp.src(['pro'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('livereload-dev', function() {
    var watchArr = ['dev/styles/css/*.css', 'dev/styles/img/*', 'dev/scripts/**/*.js', 'dev/scripts/**/*.jsx', 'dev/*.html'];
    return gulp.src(watchArr)
        .pipe(watch(watchArr))
        .pipe(connect.reload());
});

gulp.task('livereload-pro', function() {
    var watchArr = ['pro/styles/css/*.css', 'pro/styles/img/*', 'pro/scripts/**/*.js', 'pro/*.html'];
    return gulp.src(watchArr)
        .pipe(watch(watchArr))
        .pipe(connect.reload());
});

gulp.task('watch-dev', function() {
    gulp.watch('dev/styles/scss/*.scss', ['styles-dev']);
});

gulp.task('watch-pro', function() {
    gulp.watch('dev/scripts/**/*.js', ['rjs']);

    gulp.watch('dev/styles/scss/*.scss', ['styles-pro']);

    gulp.watch('dev/styles/img/*', ['images-pro']);

    gulp.watch('dev/*.html', ['html']);
});

gulp.task('pro-watch', function(cb) {
    gulp.task('end', function() {
        return gulp.src('')
            .pipe(notify({
                message: 'production live mode was ready'
            }));
    });
    sequence('rjs', 'styles-pro', 'images-pro', 'html', 'libs', ['server-pro', 'livereload-pro', 'watch-pro', 'end'], cb);
});

gulp.task('pro-build', function(cb) {
    gulp.task('end', function() {
        return gulp.src('')
            .pipe(notify({
                message: 'production build was completed'
            }));
    });
    sequence('clean', 'rjs', 'styles-pro', 'images-pro', 'html', 'libs', 'end', cb);
});

gulp.task('defaultOld', function(cb) {
    gulp.task('end', function() {
        return gulp.src('')
            .pipe(notify({
                message: 'debug live mode was ready'
            }));
    });
    sequence('styles-dev', ['server-dev', 'livereload-dev', 'watch-dev', 'end'], cb);
});


var gutil = require("gulp-util"),
    webpack = require("webpack"),
    webpackConfig = require("./webpack.config");

gulp.task('server', function() {
    return connect.server({
        root: 'dist',
        livereload: true,
        port: 8080,
        fallback: 'dist/index.html'
    });
});
gulp.task('livereload', function() {
    var watchArr = ['dist/*'];
    return gulp.src(watchArr)
        .pipe(watch(watchArr))
        .pipe(connect.reload());
});

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev", "server"], function() {
    gulp.run(["livereload"]);
    gulp.watch("app/**/*", ["webpack:build-dev"]);
});
gulp.task("webpack:build-dev", function(callback) {
    // modify some webpack config options
    var myDevConfig = Object.create(webpackConfig);
    // myDevConfig.devtool = "sourcemap";
    // myDevConfig.debug = true;

    // run webpack
    webpack(myDevConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// Production build
gulp.task("build", ["webpack:build"]);
gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// The development server (the recommended option for development)
gulp.task("default", ["build-dev"]);