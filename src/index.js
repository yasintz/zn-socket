const morgan = require('morgan');
const http = require('http');
const path = require('path');
const webSocket = require('./web-socket');

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

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'src', 'index.html'));
});

app.get('*', (req, res) => res.redirect('/'));
