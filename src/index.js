const morgan = require('morgan');
var express = require('express');
const http = require('http');
const webSocket = require('./web-socket');
const indexHtml = require('./index.html');

const PORT = process.env.PORT || 9122;

var app = express()
  .use(express.json())
  .use(morgan('dev'))
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
