import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

export const calculateHash = async filePath => {
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => {
      const hexHash = hash.digest('hex');
      console.log(hexHash);
      resolve(hexHash);
    });
    stream.on('error', error => {
      if (error.code === 'ENOENT') {
        reject(new Error('Source file not found'));
      } else {
        reject(error);
      }
    });
  });
};
