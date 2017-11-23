const gulp = require('gulp');
const inject = require('gulp-inject');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const fetchConfig = require('zero-config');
const config = fetchConfig(__dirname);
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const del = require('del');
const rev = require('gulp-rev');

gulp.task('default', ['build-server', 'build-client'], () => {
  // place code for your default task here
  console.log('done building, cleaning up');
  return del(['tmp']);
});

gulp.task('build-server', () =>
  gulp
    .src('src/server/**/*.js')
    .pipe(babel({}))
    .pipe(gulp.dest('dist/server'))
);

gulp.task('build-client', [
  'build-client:sass',
  'build-client:js',
  'build-client:html',
  'build-client:img'
]);

gulp.task('build-client:sass', ['build-client:sass:lint'], function() {
  let outputStyle = config.get('client.sass.outputStyle') || 'compressed';
  return gulp
    .src('src/client/stylesheets/**/*.scss')
    .pipe(sass.sync({outputStyle: outputStyle}).on('error', sass.logError))
    .pipe(rev())
    .pipe(gulp.dest('dist/client/stylesheets'));
});

gulp.task('build-client:sass:lint', function() {
  return gulp
    .src('src/client/stylesheets/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('build-client:js', ['build-client:js:babel', 'build-client:js:broswerify']);

gulp.task('build-client:js:babel', () =>
  gulp
    .src('src/client/javascripts/**/*')
    .pipe(babel({}))
    .pipe(gulp.dest('tmp/client/javascripts'))
);

gulp.task('build-client:js:broswerify', ['build-client:js:babel'], function() {
  // gulp expects tasks to return a stream, so we create one here.
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: 'tmp/client/javascripts/index.js',
    debug: true
  });

  return (b
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(rev())
      .pipe(gulp.dest('./dist/client/javascripts/')) );
});

gulp.task(
  'build-client:html',
  ['build-client:sass', 'build-client:js', 'build-client:js:broswerify'],
  function() {
    const target = gulp.src('src/client/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    const sources = gulp.src(
      ['dist/client/javascripts/**/*.js', 'dist/client/stylesheets/**/*.css'],
      {
        read: false
      }
    );

    return target.pipe(inject(sources, {ignorePath: 'dist/client'})).pipe(gulp.dest('dist/client'));
  }
);

gulp.task('build-client:img', () =>
  gulp.src('src/client/images/**/*').pipe(gulp.dest('dist/client/images'))
);
