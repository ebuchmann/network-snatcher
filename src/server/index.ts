import * as express from 'express';
import logger from './logger';

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

  server.listen(PORT, () => {
    console.log(`Network Snatcher running at: http://localhost:${PORT}`);
  });
}

export { init };
