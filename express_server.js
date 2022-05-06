const express = require('express');
const app = express();
const port = 3000;

// app.use(function(req, res, next) {
//   req.setTimeout(500000, function() {
//     // call back function is called when request timed out.
//   });
//   next();
// });

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Got request');
  res.setTimeout(2000, (socket) => {
    console.log('res timeout');
  });
  setTimeout(() => res.send('Hello world!'), 500);
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Received data');
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// server.requestTimeout = 5000;

// server.setTimeout(5000, (socket) => {
//   console.log('timeout');
//   socket.destroy();
// });
