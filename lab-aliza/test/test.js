'use strict';

const net = require('net');
const expect = require('chai').expect;
const server = require('../lib/_server');
const port = 5000;




describe('chat server', () => {
  before((done) => {
    server.listen(port);
    done();
  });
  after((done) => {
    server.close();
    done();
  });

  it('should send data between clients', (done) => {
    let client1 = net.connect({port});
    let client2 = net.connect({port});
    var messages = ['test message 2', 'test message 1', 'Welcome to the chatroom!\n'];
    var toSend = ['test message 2', 'test message 1'];

    client2.on('data', function(data) {
      expect(data.toString()).to.eql(messages.pop());
      if (toSend.length) {
        client1.write(toSend.pop());
      } else {
        client1.end();
      }
    });

    client1.on('close', function() {
      client2.end();
      expect(messages.length).to.eql(0);
      done();
    });
  });
});
