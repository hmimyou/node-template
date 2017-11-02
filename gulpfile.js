const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', ['babel-server'], () => {
  // place code for your default task here
  console.log('doing default task');
});

gulp.task('babel-server', () =>
  gulp
    .src('src/server/**/*.js')
    .pipe(babel({}))
    .pipe(gulp.dest('dist/server'))
);
