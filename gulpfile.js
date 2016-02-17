var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del')

gulp.task('clean:build', function () {
  return del('dist/**/*.*');
})

gulp.task('build', ['clean:build'], function () {
  var src = 'src/backbone.computed.js';
  gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('backbone.computed.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));

  return gulp.src(src).pipe(gulp.dest('dist'));
})

gulp.task('default', ['build']);