import * as express from 'express';
import axios from 'axios';
import logger from './logger';
import * as fetch from 'isomorphic-fetch';
import * as cors from 'cors';

const PORT = 3002;
const app = express();
const server = require('http').createServer(app);

app.use(cors());

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
  const { data } = await axios.get('https://swapi.co/api/planets/2/');
  // res.send(data);
  // try {
  //   const { data } = await axios.post('http://localhost:3000/post', {
  //     prop: 'val',
  //     TESTING: 'LOOK AT ME',
  //   });
  //   //   const data4 = await fetch('https://notasite123456.com');
  // } catch (error) {}
  res.send('ok usa');
});

app.get('/network-snatcher', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/app.js', (req, res) => {
  res.sendFile(__dirname + '/app.js');
});

server.listen(PORT, () => {
  console.log(`express running on port ${PORT}`);
});

export default logger;
