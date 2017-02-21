
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var gulp = require('gulp');

var less = require('gulp-less');
var rename = require('gulp-rename');
// var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var profixer = require('gulp-autoprefixer');
var merge = require('merge-stream');
var rjs = require('requirejs');
var hash = require('flf-gulp-file-hash');


var main = ['../../js/main'].concat(
    glob.sync('../../components/*.js').map(e => e.replace(/\.js$/, '')),
    glob.sync('./components/*.js').map(e => e.replace(/\.js$/, '')),
    glob.sync('./libs/*.js').map(e => e.replace(/\.js$/, '')),
    glob.sync('./pages/*.js').map(e => e.replace(/\.js$/, ''))
)


var distpath = './dist'
gulp.task('css', () => {
    return gulp.src(['../../css/*.css', 'css/*.css'])
                .pipe( minify() )
                .pipe( profixer() )
                .pipe( concat('common.min.css') )
                .pipe( gulp.dest(`${distpath}/css`) )

})

gulp.task('copy', () => {
    return merge(
        gulp.src(['../../libs/require.js'], {base: '../../'}),
        gulp.src(['../../fonts/*.*'], {base: '../../'}),
        gulp.src(['imgs/*.*', 'fonts/*.*'], {base: './'})
    )
    .pipe( gulp.dest(distpath) )
})

console.log('-----\n', main)
gulp.task('js', ['css', 'copy'], () => {
    rjs.optimize({
        baseUrl: './',
        paths: {
            "$":"../../libs/zepto",
            "md5":"../../libs/md5",
            "pm":"../../js/pageViewManager",
            "base":"../../components/base",
            "pageview":"../../components/pageview",
            "utils":"../../js/utils",
            "calendar":"../../components/calendar",
            "swiper":"../../components/swiper",
            "tip":"../../components/tip"
        },
        include: main,
        out: `${distpath}/js/main.min.js`,
        optimize: 'uglify2',
        uglify2:{
            output:{
                quote_keys: true
            }
        }
    }, res => {
        gulp.run('html');
    })
})

gulp.task('hash', () => {
    return gulp.src(['dist/css/*.css', 'dist/js/*.js']).pipe(hash());
})

gulp.task('html', ['hash'], () => {
    gulp.src('./index.tpl')
        .pipe( rename('index.html') )
        .pipe( hash.url(distpath) )
        .pipe( gulp.dest(distpath) );
})

gulp.task('default', ['js']);
