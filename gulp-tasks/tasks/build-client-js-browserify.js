const gulp = require('gulp');
const taskName = __filename.slice(__dirname.length + 1, -3);
const taskCfg = require('../defaults/task-defaults')[taskName];
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');

module.exports = () => {
  // gulp expects tasks to return a stream, so we create one here.
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: taskCfg.entries,
    debug: taskCfg.debug
  });

  return (
    b
      .bundle()
      .pipe(source(taskCfg.source))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(rev())
      .pipe(gulp.dest(taskCfg.dest))
  );
};
