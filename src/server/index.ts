import * as express from 'express';
import axios from 'axios';
import logger from './logger';
import * as fetch from 'isomorphic-fetch';

const PORT = 3000;
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);
logger.init();

io.on('connection', client => {
  logger.on('ended', data => {
    console.log('Sending it over');
    client.emit('data', data);
  });
});

app.get('/', async (req, res) => {
  const data2 = await fetch('https://swapi.co/api/planets/1/');
  // console.log(await data.json());
  const { data } = await axios.get('https://swapi.co/api/planets/1/');
  // res.send(data);
  res.send('ok');
});

app.get('/network-snatcher', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => {
  console.log('express running on port 3000');
});
