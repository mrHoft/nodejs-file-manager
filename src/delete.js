import { unlink } from 'node:fs/promises';
import { message } from './message.js';

export const deleteFile = async filePath => {
  await unlink(filePath)
    .then(() => console.log('File deleted successfully'))
    .catch(err => {
      if (err.code === 'ENOENT') {
        message.error('File not found');
      } else if (err.code === 'EISDIR') {
        message.error('Can not delete directory');
      } else {
        message.error(err.message);
      }
    });
};
