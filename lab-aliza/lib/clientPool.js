const ee = require('events');

const clientPool = function(pool) {
  this.pool = pool;
  pool.id = (Math.floor(Math.random() * 90000) + 10000);
  pool.name = 'user_: ' + pool.id;

  ee.on('close', () => {
    clients.splice(clients.indexOf(socket), 1);
  });

  ee.on('error', () => {
    console.log('error');
  });

  ee.on('data', (data) => {
    console.log(pool.name + ': ' + data.toString());
    socket.write('message sent\n');
    clients.forEach((client) => {
      if (socket.name !== client.name) {
        client.write('user_' + socket.name + ': ' + data.toString());
      }
      if (data.toString() === 'LEAVE CHAT\r\n') {
        client.write('Disconnected... ');
        socket.end();
      }
    });
  });
};

module.exports = exports = clientPool;
