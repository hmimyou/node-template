const process = require('process');

module.exports = {
  isProd: process.env.NODE_ENV === 'production',
  env: process.env.NODE_ENV || 'development'
};
