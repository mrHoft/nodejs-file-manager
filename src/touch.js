import { writeFile } from 'node:fs/promises';
import { message } from './message.js';

export const touch = async filePath => {
  try {
    await writeFile(filePath, '');
    console.log(`Empty ${filePath} created successfully`);
  } catch (err) {
    message.error(err.message);
  }
};
