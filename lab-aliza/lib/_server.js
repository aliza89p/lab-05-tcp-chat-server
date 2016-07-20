'use strict';

const net = require('net');
const ClientPool = require('./clientPool');

let clientPool = new ClientPool();

const server = net.createServer();

server.on('connection', (socket) => {
  clientPool.ee.emit('register', socket);
});

module.exports = server;
