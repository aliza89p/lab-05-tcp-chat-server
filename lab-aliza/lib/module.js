'use strict';

const net = require('net');
let clientPool = {};
clientPool.ee = require('events');
clientPool.pool = [];

const server = net.createServer((socket) => {
  socket.name = Math.floor(Math.random() * 90000) + 10000;
  clientPool.pool.push(socket);

  socket.on('data', (data) => {
    console.log('user_' + socket.name + ': ' + data.toString());
    socket.write('message sent\n');
    clientPool.pool.forEach((client) => {
      if (socket.name !== client.name) {
        client.write('user_' + socket.name + ': ' + data.toString());
      }
      if (data.toString() === 'LEAVE CHAT\r\n') {
        client.write('Disconnected... ');
        socket.end();
      }
    });
  });

  socket.on('error', (error) => {
    console.log('Error: ' + error);
  });

  socket.on('end', () => {
    console.log('disconnected');
    clientPool.pool.splice(clientPool.pool.indexOf(socket), 1);
  });

});

module.exports = server, clientPool;
