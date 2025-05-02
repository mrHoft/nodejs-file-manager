import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { message } from './message.js';

export const copyFile = async (a, b) => {
  const readStream = createReadStream(a);
  const writeStream = createWriteStream(b);

  try {
    await pipeline(readStream, writeStream);
    console.log('File copied successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      message.error('Source file not found');
    } else {
      message.error(err.message);
    }
  }
};
