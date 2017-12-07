const gulp = require('gulp');
const taskName = __filename.slice(__dirname.length + 1, -3);
const taskCfg = require('../defaults/task-defaults')[taskName];

module.exports = () => gulp.src(taskCfg.src).pipe(gulp.dest(taskCfg.dest));
