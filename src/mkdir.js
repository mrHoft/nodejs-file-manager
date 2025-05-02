import { mkdir } from 'node:fs/promises';
import { message } from './message.js';

export const createFolder = async dirName => {
  try {
    await mkdir(dirName);
    console.log(`Directory ${dirName} created successfully`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      message.error('Directory already exists');
    } else {
      message.error(err.message);
    }
  }
};
