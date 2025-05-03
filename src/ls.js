import { readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { message } from './message.js';

export const ls = async (dirName = '.') => {
  try {
    const items = await readdir(resolve(dirName));
    const tableData = await Promise.all(
      items.map(async item => {
        const stats = await stat(resolve(join(dirName, item)));
        return {
          name: item,
          type: stats.isDirectory() ? 'directory' : 'file',
        };
      })
    );

    tableData.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'directory' ? -1 : 1;
    });

    console.table(tableData);
  } catch (err) {
    message.error(err.message);
  }
};
