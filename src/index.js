const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const http = require('http');
const webSocket = require('./web-socket');
const indexHtml = require('./index.html');

const PORT = process.env.PORT || 9122;

var app = express()
  .use(express.json())
  .use(morgan('dev'))
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
    );
    next();
  })
  .use(
    cors({
      origin: function (origin, callback) {
        return callback(null, true);
      },
    })
  );

app.get('/emitter', (req, res) => {
  res.send(indexHtml(true));
});

app.get('/listener', (req, res) => {
  res.send(indexHtml(false));
});

const server = http.createServer(app);

webSocket(server);

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on server http://localhost:${PORT}`);
});
