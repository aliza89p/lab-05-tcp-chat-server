'use strict';

const net = require('net');
const expect = require('chai').expect;
const server = require('../lib/_server');
const port = 5000;

describe('chat server', () => {
  let client1 = net.connect({port});
  let client2 = net.connect({port});
  let messages = ['test', 'Welcome to the chatroom!\n'];
  let testMessage = ['test'];

  before((done) => {
    server.listen(port, done);
  });
  after((done) => {
    server.close(done);
  });

  it('should send messages between clients', (done) => {
    client2.on('data', function(data) {
      expect(data.toString()).to.eql(messages.pop());
      if (testMessage.length > 0){
        client1.write(testMessage.pop().slice(7));
      }
      else {
        client1.end();
      }
    });
    done();
  });

  it('should close on "close"', (done) => {
    client1.on('close', function() {
      client2.end();
      expect(messages.length).to.eql(0);
    });
    done();
  });

  it('should throw err', (done) => {
    client1.on('error', (err) => {
      expect(err).to.eql('error: ' + err);
    });
    done();
  });
});
