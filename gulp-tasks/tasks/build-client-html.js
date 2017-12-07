const gulp = require('gulp');
const taskName = __filename.slice(__dirname.length + 1, -3);
const taskCfg = require('../defaults/task-defaults')[taskName];
const inject = require('gulp-inject');

module.exports = function() {
  const target = gulp.src(taskCfg.target);
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  const sources = gulp.src(taskCfg.sources, {
    read: false
  });

  return target.pipe(inject(sources, {ignorePath: taskCfg.dest})).pipe(gulp.dest(taskCfg.dest));
};
