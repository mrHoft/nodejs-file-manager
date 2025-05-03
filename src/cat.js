import { createReadStream } from 'node:fs';
import { message } from './message.js';

export const cat = filePath =>
  new Promise(resolve => {
    createReadStream(filePath, 'utf8')
      .on('data', chunk => {
        process.stdout.write(chunk);
      })
      .on('end', resolve)
      .on('error', err => {
        if (err.code === 'ENOENT') {
          message.error('File not found');
        } else {
          message.error(err.message);
        }
        resolve();
      });
  });
