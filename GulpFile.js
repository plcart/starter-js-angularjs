'use strict';
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    del = require('del');


gulp.task('clean', function () {
    return del(['dist']);
});


gulp.task('usemin', function () {
    return gulp.src('./src/**/*.html')
        .pipe(plugins.usemin({
            js: [plugins.ngAnnotate(), plugins.uglify(), plugins.rev()],
            js1: [plugins.uglify(), plugins.rev()],
            css: [plugins.cssnano(), plugins.rev()],
            css1: [ plugins.rev()],
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(gulp.dest('./src/styles'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});


gulp.task('build', ['clean', 'sass'], function () {
    gulp.start('usemin');
});