'use strict';

const net = require('net');
const expect = require('chai').expect;
const server = require('../lib/_server');
const port = 5000;

describe('chat server', () => {
  before((done) => {
    server.listen(port, done);
  });
  after((done) => {
    server.close(done);
  });

  it('should send messages between clients', (done) => {
    let client1 = net.connect({port});
    let client2 = net.connect({port});
    let messages = [this.nickName + ': test', 'Welcome to the chatroom!\n'];
    let testMessage = ['test'];

    client2.on('data', (data) => {
      expect(data.toString()).to.eql(messages.pop());
      if(testMessage.length > 0) {
        client1.write(testMessage.pop());
      } else {
        client1.end();
      }
    });

    client1.on('close', () => {
      client2.end();
      expect(messages.length).to.eql(0);
      done();
    });
  });
});
