import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { message } from './message.js';

export const moveFile = async (a, b) => {
  const readStream = createReadStream(a);
  const writeStream = createWriteStream(b);

  try {
    await pipeline(readStream, writeStream);

    await new Promise((resolve, reject) => {
      unlink(a, err => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log('File moved successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      message.error('Source file not found');
    } else {
      message.error(err.message);
      unlink(b, () => {});
    }
  }
};
