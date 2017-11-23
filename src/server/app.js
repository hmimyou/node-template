const express = require('express');
const app = express();
const fetchConfig = require('zero-config');
const format = require('string-format');
format.extend(String.prototype);

const config = fetchConfig('{0}/../../'.format(__dirname));
const port = config.get('server.port');

function startServer(callback) {
  app.get('/health', (req, res) => {
    res.send('OK!\n');
  });

  app.use(express.static('{0}/../client'.format(__dirname)));

  app.listen(port, () => {
    console.log('Example app running, visit through http://localhost:{0}'.format(port));

    if (typeof callback === 'function') {
      return callback(app);
    }
    return null;
  });
}

exports.startServer = startServer;
