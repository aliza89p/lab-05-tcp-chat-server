'use strict';

const ee = require('events');

const ClientPool = function() {
  this.ee = new ee();
  this.pool = {};

  this.ee.on('register', function(socket) {
    socket.id = Math.floor(Math.random() * 90000) + 10000;
    socket.nickName = 'user_' + Math.floor(Math.random() * 900) + 100;
    this.pool[socket.id] = socket;

    this.ee.on('error', (error) => {
      console.log('error', error);
    });

    this.ee.on('data', (data) => {
      socket.ee.emit('broadcast', data);
    });

    this.ee.on('close', () => {
      delete ClientPool.pool[socket.id];
      console.log('closed from pool');
      socket.end();
    });

    this.ee.on('broadcast', (data) => {
      console.log(this.socket.nickname + ': ' + data.toString());
      socket.write('message sent\n');
      for(var client in ClientPool.pool){
        if (client !== socket.id) {
          client.write('user_' + this.socket.nickName + ': ' + data.toString());
        }
        if (data.toString() === 'LEAVE CHAT\r\n') {
          client.write('Disconnected... ');
          socket.ee.emit('close');
        }
      }
    });
  }.bind(this));
};

module.exports = exports = ClientPool;
