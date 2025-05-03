import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join, basename } from 'node:path';
import { unlink, access, constants } from 'node:fs/promises';
import { message } from './message.js';

export const copyFile = async (sourcePath, destFolder) => {
  const sourceName = basename(sourcePath);
  const destPath = join(destFolder, sourceName);
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);

  const destExist = await access(destPath, constants.F_OK)
    .then(() => {
      message.error('Destination file already exist');
      return true;
    })
    .catch(() => false);
  if (destExist) return;

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

export const moveFile = async (sourcePath, destFolder) => {
  const sourceName = basename(sourcePath);
  const destPath = join(destFolder, sourceName);
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);

  const destExist = await access(destPath, constants.F_OK)
    .then(() => {
      message.error('Destination file already exist');
      return true;
    })
    .catch(() => false);
  if (destExist) return;

  try {
    await pipeline(readStream, writeStream);

    await unlink(sourcePath).catch(err => {
      if (err.code !== 'ENOENT') throw err;
    });

    console.log('File moved successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      message.error('Source file not found');
    } else {
      message.error(err.message);
      unlink(destPath, () => {});
    }
  }
};
