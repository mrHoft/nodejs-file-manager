import process from 'node:process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { message } from './src/message.js';
import { ls } from './src/ls.js';
import { cat } from './src/cat.js';
import { createFile } from './src/create.js';
import { createFolder } from './src/mkdir.js';
import { renameFile } from './src/rename.js';
import { copyFile } from './src/copy.js';
import { moveFile } from './src/move.js';
import { deleteFile } from './src/delete.js';
import { systemInfo } from './src/os.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const username = (() => {
  const args = process.argv.slice(2);
  const arg = args.find(arg => arg.startsWith('--username'));
  if (arg) {
    const name = arg.split('=')[1];
    if (name) return name;
  }

  return 'Anonymous';
})();

const terminate = () => {
  message.exit(username);
  process.exit(0);
};

function app() {
  message.welcome(username);
  message.help();
  message.stdin();
  message.dir(process.cwd());

  process.stdin
    .setEncoding('utf8')
    .on('data', chunk => {
      const input = chunk.toString().trim();
      const operation = input.split(' ')[0].toLowerCase();
      const args = (() => {
        const arr = input.split(' ').slice(1);
        if (arr && Array.isArray(arr) && arr.length) return arr;
        return undefined;
      })();

      const dir = process.cwd();
      switch (operation) {
        case '.exit': {
          terminate();
          break;
        }
        case 'up': {
          if (dir === __dirname) {
            message.invalid('can not change directory upper than current');
          } else {
            process.chdir(resolve('..'));
            message.dir(process.cwd());
          }
          break;
        }
        case 'ls': {
          message.dir(dir);
          ls(join(dir, args ? args[0] : ''));
          break;
        }
        case 'cd': {
          if (args) {
            process.chdir(args[0]);
            message.dir(process.cwd());
          } else {
            message.invalid('no directory name was provided');
          }
          break;
        }
        case 'cat': {
          if (args) {
            message.dir(dir);
            cat(join(dir, args[0]));
          } else {
            message.invalid('no file name was provided');
          }
          break;
        }
        case 'add': {
          if (args) {
            message.dir(dir);
            createFile(join(dir, args[0]));
          } else {
            message.invalid('no file name was provided');
          }
          break;
        }
        case 'mkdir': {
          if (args) {
            message.dir(dir);
            createFolder(args[0]);
          } else {
            message.invalid('no directory name was provided');
          }
          break;
        }
        case 'rn': {
          if (args && args[0] && args[1]) {
            message.dir(dir);
            renameFile(join(dir, args[0]), join(dir, args[1]));
          } else {
            console.log(args);
            message.invalid('no file name was provided');
          }
          break;
        }
        case 'cp': {
          if (args && args[0] && args[1]) {
            message.dir(dir);
            copyFile(join(dir, args[0]), join(dir, args[1]));
          } else {
            message.invalid('no file name was provided');
          }
          break;
        }
        case 'mv': {
          if (args && args[0] && args[1]) {
            message.dir(dir);
            moveFile(join(dir, args[0]), join(dir, args[1]));
          } else {
            message.invalid('no file name was provided');
          }
          break;
        }
        case 'rm': {
          if (args) {
            message.dir(dir);
            deleteFile(join(dir, args[0]));
          } else {
            message.invalid('no file name was provided');
          }
          break;
        }
        case 'os': {
          if (args) {
            message.dir(dir);
            systemInfo(args[0]);
          } else {
            message.invalid('no argument was provided');
          }
          break;
        }
        default: {
          message.invalid(`unknown command ${operation}`);
        }
      }
    })
    .on('error', err => {
      message.error(err.message);
    });

  process.on('SIGINT', terminate);
}

app();
