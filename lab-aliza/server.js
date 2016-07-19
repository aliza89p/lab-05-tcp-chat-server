'use strict';

const net = require('net');
const ClientPool = require('./lib/clientPool');
let clientPool = new ClientPool();

const server = net.createServer();

server.on('connection', (socket) => {
  clientPool.ee.emit('register', socket);
});

server.listen(3000, () => {
  console.log('Server up on 3000');
});
