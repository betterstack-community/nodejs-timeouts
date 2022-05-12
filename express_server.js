const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('Got request');
  setTimeout(() => res.send('Hello world!'), 10000);
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

server.setTimeout(5000, (socket) => {
  console.log('timeout');
  socket.destroy();
});
