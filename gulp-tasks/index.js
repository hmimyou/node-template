const gulp = require('gulp');
const taskDeps = require('./deps');
const fs = require('fs');

const tasks = [
  'build-server',
  'build-client',
  'build-client-img',
  'build-client-js',
  'build-client-js-babel',
  'build-client-js-browserify',
  'build-client-sass',
  'build-client-sass-lint',
  'build-client-html',
  'clean-up'
];

module.exports = function registerTasks() {
  tasks.forEach(function(name) {
    let taskPath = './tasks/' + name;
    let taskFullPath = './gulp-tasks/tasks/' + name + '.js';
    let task = (fs.existsSync(taskFullPath) && require(taskPath)) || function noop() {};
    let deps = taskDeps[name] || [];
    gulp.task(name, deps, task);
  });
  return tasks;
};
