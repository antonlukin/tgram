var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var inline = require('gulp-inline-source');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');


gulp.task('connect', function(done) {
  connect.server({
    root: 'src'
  });

  done();
});


gulp.task('watch', function (done) {
  gulp.watch(['src/index.html', 'src/scss/**/*', 'src/js/*.js'], gulp.parallel('scss', 'js'));

  done();
});


gulp.task('scss', function(done) {
  gulp.src('src/scss/app.scss')
    .pipe(plumber())
    .pipe(sass({errLogToConsole: true}))
    .pipe(prefix())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('src/'));

  done();
});


gulp.task('js', function(done) {
  gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('src/'));

  done();
})


// Prepare to public
gulp.task('build', function(done) {
  gulp.src('./src/index.html')
    .pipe(plumber())
    .pipe(inline())
    .pipe(gulp.dest('build/'));

  done();
});

// Build scripts and styles
gulp.task('default', gulp.parallel('scss', 'js', 'connect', 'watch'));