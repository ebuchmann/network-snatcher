import * as http from 'http';
import * as zlib from 'zlib';
import * as shortid from 'shortid';
import { parse } from 'querystring';
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

  init = async () => {
    this.original = http.request;

    // @ts-ignore
    http.request = (options, callback) => {
      const request = this.original(options, callback);

      if (options.method.toUpperCase() === 'POST') {
        console.log(options);
      }

      // if (options.hostname === '127.0.0.1') return request;

      const obj = {
        id: shortid.generate(),
        request: {} as Req,
        response: {
          data: {},
          headers: {},
          statusCode: null,
        },
        startTime: Date.now(),
        endTime: null,
      };

      obj.request = pick(options, ['method', 'path', 'port', 'hostname']);

      if (request.method.toUpperCase() === 'POST') {
        let body = '';
        request.on('data', chunk => {
          console.log(chunk);
          body += chunk.toString();
        });
        request.on('end', () => {
          console.log(parse(body));
        });
      }

      request.on('response', async res => {
        obj.response.headers = res.headers;
        obj.response.statusCode = res.statusCode;
        if (res.headers['content-encoding'] === 'gzip') {
          obj.response.data = await this.handleGzip(res);
        } else {
          obj.response.data = await this.handleBuffer(res);
        }
        obj.endTime = Date.now();
        this.emit('ended', obj);
      });

      request.on('error', err => {
        console.log(err);
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
      res.on('end', () => {
        if (!str) return resolve();

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
