var gulp  = require('gulp')
,   mocha = require('gulp-mocha');

gulp.task('test', function () {
  return gulp.src('test/*.test.js')
    .pipe(mocha());
});

gulp.task('default', function () {
  gulp.watch(['index.js', 'test/*.test.js'], ['test']);
});
