import * as express from 'express';
import logger from './logger';

// TODO: remove imports / packages - just for testing
import axios from 'axios';
import * as fetch from 'isomorphic-fetch';

function init(PORT: number = 3002) {
  const app = express();
  const server = require('http').createServer(app);

  const io = require('socket.io')(server);

  logger.init();

  io.on('connection', client => {
    logger.on('ended', data => {
      client.emit('data', data);
    });
  });

  app.get('/', function(_req, res) {
    res.sendFile(`${__dirname}/index.html`);
  });

  app.get('/app.js', (_req, res) => {
    res.sendFile(`${__dirname}/app.js`);
  });

  // TODO: Remove me, just for testing
  app.get('/test', async (req, res) => {
    // const data2 = await fetch('https://swapi.co/api/planets/1/');
    // const data = await fetch('https://swapi.co/api/planets/3/');
    await axios.post('http://localhost:3002/test', { body: 'copy' });
    // await fetch('https://swapi.co/api/planets/4');
    // await fetch('https://swapi.co/api/planets/5');
    // await fetch('https://swapi.co/api/planets/6');
    // console.log(await data.json());
    // const { data } = await axios.get('https://swapi.co/api/planets/2/');
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

  app.post('/test', (req, res) => {
    res.send({ hi: 'there' });
  });

  server.listen(PORT, () => {
    console.log(`Network Snatcher running at: http://localhost:${PORT}`);
  });
}

init(3002);
// module.exports = init();
