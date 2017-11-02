const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', ['build-server', 'build-client'], () => {
  // place code for your default task here
  console.log('doing default task');
});

gulp.task('build-server', () =>
  gulp
    .src('src/server/**/*.js')
    .pipe(babel({}))
    .pipe(gulp.dest('dist/server'))
);

gulp.task('build-client', () => gulp.src('src/client/**/*').pipe(gulp.dest('dist/client')));
