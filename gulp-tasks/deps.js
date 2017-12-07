module.exports = {
  'build-client-js-browserify': ['build-client-js-babel'],
  'build-client-js': ['build-client-js-babel', 'build-client-js-browserify'],
  'build-client-sass': ['build-client-sass-lint'],
  'build-client-html': ['build-client-sass', 'build-client-js', 'build-client-js-browserify'],
  'build-client': ['build-client-sass', 'build-client-js', 'build-client-html', 'build-client-img'],
  'clean-up': ['build-server', 'build-client']
};
