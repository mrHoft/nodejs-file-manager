import process from 'node:process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { message } from './src/message.js';
import { ls } from './src/ls.js';
import { cat } from './src/cat.js';
import { touch } from './src/touch.js';
import { createFolder } from './src/mkdir.js';

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
        const arg = input.split(' ')[1];
        if (arg) return arg.split(' ');
        return undefined;
      })();

      switch (operation) {
        case '.exit': {
          terminate();
          break;
        }
        case 'up': {
          if (process.cwd() === __dirname) {
            message.invalid('can not change directory upper than current');
          } else {
            process.chdir(resolve('..'));
            message.dir(process.cwd());
          }
          break;
        }
        case 'ls': {
          const dir = process.cwd();
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
            const dir = process.cwd();
            message.dir(dir);
            cat(join(dir, args[0]));
          } else {
            message.invalid('no file name was provided');
          }
          break;
        }
        case 'add': {
          if (args) {
            const dir = process.cwd();
            message.dir(dir);
            touch(join(dir, args[0]));
          } else {
            message.invalid('no file name was provided');
          }
          break;
        }
        case 'mkdir': {
          if (args) {
            message.dir(process.cwd());
            createFolder(args[0]);
          } else {
            message.invalid('no directory name was provided');
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
