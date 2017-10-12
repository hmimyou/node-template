const express = require('express');
const app = express();
const fetchConfig = require('zero-config');
const format = require('string-format');
format.extend(String.prototype);

const config = fetchConfig(__dirname);
const port = config.get('app.port');

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Example app listening on port {0}!'.format(port));
});
