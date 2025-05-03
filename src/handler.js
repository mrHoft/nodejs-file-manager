import { parse, resolve } from 'node:path';
import { message } from './message.js';
import { ls } from './ls.js';
import { cat } from './cat.js';
import { createFile } from './create.js';
import { createFolder } from './mkdir.js';
import { renameFile } from './rename.js';
import { copyFile, moveFile } from './copy.js';
import { deleteFile } from './delete.js';
import { systemInfo } from './os.js';
import { calculateHash } from './hash.js';
import { compressFile, decompressFile } from './zip.js';

const root = parse(resolve('.')).root;

export async function handler(input) {
  const operation = input.split(' ')[0].toLowerCase();
  const args = (() => {
    const arr = input.split(' ').slice(1);
    if (arr && Array.isArray(arr) && arr.length) return arr;
    return undefined;
  })();

  const dir = process.cwd();
  switch (operation) {
    case 'up': {
      if (dir === root) {
        message.invalid('can not change directory upper than root');
      } else {
        process.chdir(resolve('..'));
      }
      break;
    }
    case 'ls': {
      await ls(args ? args[0] : '.');
      break;
    }
    case 'cd': {
      if (args) {
        try {
          process.chdir(args[0]);
        } catch (err) {
          if (err.code === 'ENOENT') {
            message.error('No such directory');
          } else {
            message.error(err.message);
          }
        }
      } else {
        message.invalid('no directory name was provided');
      }
      break;
    }
    case 'cat': {
      if (args) {
        await cat(args[0]);
      } else {
        message.invalid('no file name was provided');
      }
      break;
    }
    case 'add': {
      if (args) {
        await createFile(args[0]);
      } else {
        message.invalid('no file name was provided');
      }
      break;
    }
    case 'mkdir': {
      if (args) {
        await createFolder(args[0]);
      } else {
        message.invalid('no directory name was provided');
      }
      break;
    }
    case 'rn': {
      if (args && args[0] && args[1]) {
        await renameFile(args[0], args[1]);
      } else {
        console.log(args);
        message.invalid('no file name was provided');
      }
      break;
    }
    case 'cp': {
      if (args && args[0] && args[1]) {
        await copyFile(args[0], args[1]);
      } else {
        if (!args || !args[0]) {
          message.invalid('no file name was provided');
        } else {
          message.invalid('no directory name was provided');
        }
      }
      break;
    }
    case 'mv': {
      if (args && args[0] && args[1]) {
        await moveFile(args[0], args[1]);
      } else {
        if (!args || !args[0]) {
          message.invalid('no file name was provided');
        } else {
          message.invalid('no directory name was provided');
        }
      }
      break;
    }
    case 'rm': {
      if (args) {
        await deleteFile(args[0]);
      } else {
        message.invalid('no file name was provided');
      }
      break;
    }
    case 'os': {
      if (args) {
        systemInfo(args[0]);
      } else {
        message.invalid('no argument was provided');
      }
      break;
    }
    case 'hash': {
      if (args) {
        await calculateHash(args[0]).catch(err => message.error(err.message));
      } else {
        message.invalid('no file name was provided');
      }
      break;
    }
    case 'compress': {
      if (args && args[0]) {
        await compressFile(args[0], args[1] || undefined);
      } else {
        message.invalid('no file name was provided');
      }
      break;
    }
    case 'decompress': {
      if (args && args[0]) {
        await decompressFile(args[0], args[1] || undefined);
      } else {
        message.invalid('no file name was provided');
      }
      break;
    }
    default: {
      message.invalid(`unknown command ${operation}`);
    }
  }
}
