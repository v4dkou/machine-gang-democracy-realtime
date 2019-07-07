const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

let clientId = 0;
let clients = [];

app.use(bodyParser.json());
app.post('/msg/', (req, res) => {
  io.sockets.emit('message', req.body);

  res.status = 200;
  res.send();
});

server.listen(port, '0.0.0.0', () => {
  console.log('Server listening at port %d', port);
});

io.on('connection', client => {
  clientId++;
  client.clientId = clientId;
  clients.push(client);

  console.log(`Client ${clientId} connected`);

  client.on('disconnect', () => {
    clients = clients.filter(c => c.clientId !== client.clientId);
  });
});
