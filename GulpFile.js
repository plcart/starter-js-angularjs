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
            js1: [plugins.uglify(), plugins.rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['clean'], function () {
    gulp.start('usemin');
});