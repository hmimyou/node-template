const gulp = require('gulp');
const taskName = __filename.slice(__dirname.length + 1, -3);
const taskCfg = require('../defaults/task-defaults')[taskName];
const globalCfg = require('../defaults/global-defaults');
const rev = require('gulp-rev');
const sass = require('gulp-sass');

module.exports = function() {
  let outputStyle = globalCfg.isProd ? taskCfg['output-style-prod'] : taskCfg['output-style-dev'];
  return gulp
    .src(taskCfg.src)
    .pipe(sass.sync({outputStyle: outputStyle}).on('error', sass.logError))
    .pipe(rev())
    .pipe(gulp.dest(taskCfg.dest));
};
