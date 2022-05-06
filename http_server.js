const http = require('http');
const server = http.createServer((req, res) => {
  console.log('Got request');

  setTimeout(() => {
    res.end('Hello World!');
  }, 10000);
});

server.timeout = 5000;

server.listen(3000);
