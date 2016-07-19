'use strict';

const server = require('./lib/module');

server.listen(3000, () => {
  console.log('Server up on 3000');
});
