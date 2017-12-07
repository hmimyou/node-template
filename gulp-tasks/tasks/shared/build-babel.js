const gulp = require('gulp');
const babel = require('gulp-babel');

module.exports = (src, dest, babelOptions = {}) =>
  gulp
    .src(src)
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(dest));
