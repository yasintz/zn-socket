const SocketIo = require('socket.io');

function initializeSocket(server) {
  const io = SocketIo(server);
  io.on('connection', (socket) => {
    const connectLog = { type: 'connect', id: socket.id };
    socket.emit('log', connectLog);
    console.log(connectLog);
    socket.on('emit', ({ event, arg }) => {
      const emitLog = { type: 'emit', id: socket.id, arg, event };
      socket.emit('log', emitLog);
      console.log(emitLog);
      io.emit(event, arg);
    });
  });
}

module.exports = initializeSocket;
