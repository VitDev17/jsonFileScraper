var express = require('express');
var config = require('./config');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(config.PORT, () => {
  console.log('Example app listening on port 3000!');
});
