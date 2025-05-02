import { rename } from 'node:fs/promises';
import { message } from './message.js';

export const renameFile = async (a, b) => {
  try {
    await rename(a, b);
    console.log('File renamed successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      message.error('Source file not found');
    } else {
      message.error(err.message);
    }
  }
};
