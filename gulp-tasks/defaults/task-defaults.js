module.exports = {
  'build-server': {
    src: 'src/server/**/*.js',
    dest: 'dist/server'
  },
  'build-client-img': {
    src: 'src/client/images/**/*',
    dest: 'dist/client/images'
  },
  'build-client-js-babel': {
    src: 'src/client/javascripts/**/*',
    dest: 'tmp/client/javascripts'
  },
  'build-client-js-browserify': {
    entries: 'tmp/client/javascripts/index.js',
    debug: true,
    source: 'bundle.js',
    dest: './dist/client/javascripts/'
  },
  'build-client-sass': {
    src: 'src/client/stylesheets/**/*.scss',
    dest: 'dist/client/stylesheets',
    'output-style-prod': 'compressed',
    'output-style-dev': 'expanded'
  },
  'build-client-sass-lint': {
    src: 'src/client/stylesheets/**/*.s+(a|c)ss'
  },
  'build-client-html': {
    target: 'src/client/index.html',
    sources: ['dist/client/javascripts/**/*.js', 'dist/client/stylesheets/**/*.css'],
    dest: 'dist/client'
  }
};
