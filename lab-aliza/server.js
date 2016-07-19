'use strict';

const net = require('net');
const clientPool = require('./lib/clientPool');

const server = net.createServer((socket) => {
  let clients = [];
  let pool = {};
  clients.push(new clientPool(pool));

  socket.on('data', () => {
    clientPool.ee.emit('data');
  });

  socket.on('error', () => {
    clientPool.ee.emit('error');
  });

  socket.on('close', () => {
    clientPool.ee.emit('close');
  });

});

server.listen(3000, () => {
  console.log('Server up on 3000');
});
