const port = 3000;

require(__dirname + '/lib/_server.js').listen(port, () => {
  console.log('Server up on 3000');
});
