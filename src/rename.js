import { rename } from 'node:fs/promises';
import { access, constants } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { message } from './message.js';

export const renameFile = async (sourceFile, targetFileName) => {
  const targetFile = join(dirname(sourceFile), basename(targetFileName));
  if (
    await access(targetFile, constants.F_OK)
      .then(() => true)
      .catch(() => false)
  ) {
    message.error('Target file already exist');
    return;
  }

  try {
    await rename(sourceFile, targetFile);
    console.log('File renamed successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      message.error('Source file not found');
    } else {
      message.error(err.message);
    }
  }
};
