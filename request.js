const https = require('https');

const options = {
  host: 'icanhazdadjoke.com',
  path: '/',
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
  timeout: 2000,
};

const req = https.request(options, (res) => {
  res.setEncoding('utf8');

  let body = '';

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => console.log(body));
});

req.on('error', (err) => {
  if (err.code == 'ECONNRESET') {
    console.log('timeout!');
    return;
  }

  console.error(err);
});

req.on('timeout', () => {
  req.destroy();
});

req.end();
