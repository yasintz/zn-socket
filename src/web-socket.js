const SocketIo = require('socket.io');

function initializeSocket(server) {
  const io = SocketIo(server);
  io.on('connection', (socket) => {
    socket.on('emit', ({ event, arg }) => {
      io.emit(event, arg);
    });
  });
}

module.exports = initializeSocket;
