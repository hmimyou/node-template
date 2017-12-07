const gulp = require('gulp');
const taskName = __filename.slice(__dirname.length + 1, -3);
const taskCfg = require('../defaults/task-defaults')[taskName];
const sassLint = require('gulp-sass-lint');

module.exports = () =>
  gulp
    .src(taskCfg.src)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
