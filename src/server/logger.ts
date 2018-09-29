import * as http from 'http';
import * as zlib from 'zlib';
import { EventEmitter } from 'events';
import { pick } from 'lodash';

interface Req {
  method: string;
  path: string;
  port: number;
  hostname: string;
}

class Logger extends EventEmitter {
  original = null;
  name = 'eric';

  init = async () => {
    this.original = http.request;

    // @ts-ignore
    http.request = (options, callback) => {
      const request = this.original(options, callback);
      const id = Math.random();

      const obj = {
        request: {} as Req,
        response: {},
      };

      obj.request = pick(options, ['method', 'path', 'port', 'hostname']);

      request.on('response', async res => {
        console.log(`Res: ${id}`);
        if (res.headers['content-encoding'] === 'gzip') {
          obj.response = await this.handleGzip(res);
        } else {
          obj.response = await this.handleBuffer(res);
        }
        this.emit('ended', obj);
      });

      return request;
    };
  };

  handleBuffer: any = async res => {
    let str = '';

    return new Promise((resolve, reject) => {
      res.on('data', data => {
        str += data.toString();
      });
      res.on('end', a => {
        resolve(JSON.parse(str));
      });
      res.on('error', error => {
        reject(error);
      });
    });
  };

  handleGzip: any = async res => {
    const buffer = [];
    const gunzip = zlib.createGunzip();
    res.pipe(gunzip);

    return new Promise((resolve, reject) => {
      gunzip
        .on('data', function(data) {
          // decompression chunk ready, add it to the buffer
          buffer.push(data.toString());
        })
        .on('end', function() {
          resolve(JSON.parse(buffer.join('')));
        })
        .on('error', function(e) {
          reject(e);
        });
    });
  };
}

export default new Logger();
