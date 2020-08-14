const morgan = require('morgan');
const http = require('http');
const webSocket = require('./web-socket');
const indexHtml = require('./index.html');

const PORT = process.env.PORT || 9122;

var express = require('express');

var app = express();

app.use(express.json());

app.use(morgan('dev'));

const server = http.createServer(app);

webSocket(server);

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on server http://localhost:${PORT}`);
});

app.get('/emitter', (req, res) => {
  res.send(indexHtml(true));
});
app.get('/listener', (req, res) => {
  res.send(indexHtml(false));
});
