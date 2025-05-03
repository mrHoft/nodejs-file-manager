import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip, createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { access, constants } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { message } from './message.js';

export const compressFile = async (sourcePath, destFolder) => {
  const sourceName = basename(sourcePath);
  const destPath = join(destFolder ?? dirname(sourcePath), `${sourceName}.gz`);

  if (
    !(await access(destFolder ?? dirname(sourcePath), constants.F_OK)
      .then(() => true)
      .catch(() => false))
  ) {
    message.error('Destination directory not found');
    return;
  }

  if (
    await access(destPath, constants.F_OK)
      .then(() => true)
      .catch(() => false)
  ) {
    message.error('Destination file already exist');
    return;
  }

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);
  const gzip = createGzip();

  return pipeline(readStream, gzip, writeStream)
    .then(() => console.log(`${destPath} created successful`))
    .catch(err => {
      if (err.code === 'ENOENT') {
        message.error('Source file not found');
      } else {
        message.error(err.message);
      }
    });
};

export const decompressFile = async (sourcePath, destFolder) => {
  const destPath = join(destFolder ?? dirname(sourcePath), basename(sourcePath, '.gz'));

  const destExist = await access(destPath, constants.F_OK)
    .then(() => {
      message.error('Destination file already exist');
      return true;
    })
    .catch(() => false);
  if (destExist) return;

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);
  const gunzip = createGunzip();

  return pipeline(readStream, gunzip, writeStream)
    .then(() => console.log(`${destPath} created successful`))
    .catch(err => {
      if (err.code === 'ENOENT') {
        message.error('Source file not found');
      } else {
        message.error(err.message);
      }
    });
};
