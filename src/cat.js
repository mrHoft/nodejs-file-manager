import { createReadStream } from 'node:fs';
import { message } from './message.js';

export const cat = filePath => {
  const readStream = createReadStream(filePath, 'utf8');

  readStream.on('data', chunk => {
    process.stdout.write(chunk);
  });

  readStream.on('error', err => {
    if (err.code === 'ENOENT') {
      message.error('File not found');
    } else {
      message.error(err.message);
    }
  });
};
