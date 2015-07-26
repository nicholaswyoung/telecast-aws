var gulp  = require('gulp')
,   babel = require('gulp-babel')
,   mocha = require('gulp-mocha');

gulp.task('build', function () {
  return gulp.src('src/index.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('test', function () {
  return gulp.src('test/**/*.js')
    .pipe(mocha());
});

gulp.task('default', function () {
  gulp.watch('src/**/*.js', ['build', 'test']);
  gulp.watch('test/**/*.js', ['test']);
});
