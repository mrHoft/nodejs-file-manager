import { unlink } from 'node:fs';
import { message } from './message.js';

export const deleteFile = async filePath => {
  unlink(filePath, err => {
    if (err) {
      message.error(err.message);
    } else {
      console.log('File moved successfully');
    }
  });
};
