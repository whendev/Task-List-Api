/* eslint-disable no-console */
const http = require('http');
const app = require('../app');

const server = http.createServer(app);

const port = 3333;

server.listen(port, () => {
  console.log(`Servidor Online...Port: ${port}`);
});
