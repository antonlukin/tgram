var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var inline = require('gulp-inline-source');
var plumber = require('gulp-plumber');


gulp.task('styles', function(done) {
  gulp.src('src/scss/app.scss')
    .pipe(plumber())
    .pipe(sass({errLogToConsole: true}))
    .pipe(prefix())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('src/'));

  done();
});


// Prepare to public
gulp.task('default', function(done) {
  gulp.src('./src/service-worker.js')
    .pipe(gulp.dest('build/'));

  gulp.src('./src/index.html')
    .pipe(plumber())
    .pipe(inline())
    .pipe(gulp.dest('build/'));

  connect.server({
    root: 'build',
    port: 8080
  });

  done();
});