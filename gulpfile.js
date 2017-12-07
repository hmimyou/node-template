const gulp = require('gulp');
const registerTasks = require('./gulp-tasks');
const tasks = registerTasks();

gulp.task('default', tasks, () => console.log('done building'));
