import * as http from 'http';
import * as zlib from 'zlib';
import * as shortid from 'shortid';
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

      const obj = {
        id: shortid.generate(),
        headers: {},
        request: {} as Req,
        response: {
          data: {},
          headers: {},
          statusCode: null,
        },
      };

      console.log(request);
      obj.request = pick(options, ['method', 'path', 'port', 'hostname']);

      request.on('response', async res => {
        // console.log(res);
        obj.response.headers = res.headers;
        obj.response.statusCode = res.statusCode;
        if (res.headers['content-encoding'] === 'gzip') {
          obj.response.data = await this.handleGzip(res);
        } else {
          obj.response.data = await this.handleBuffer(res);
        }
        this.emit('ended', obj);
      });

      request.on('error', a => {
        console.log('er');
        console.log(a);
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
