import process from 'node:process';
import readline from 'readline';
import { homedir } from 'node:os';
import { message } from './src/message.js';
import { handler } from './src/handler.js';

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

const std = readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .on('close', terminate);

function prompt(path = '') {
  return new Promise((resolve, reject) => {
    std.question(`${path}> `, async input => {
      try {
        resolve(input);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function perform() {
  message.dir(process.cwd());

  prompt(process.cwd())
    .then(input => {
      const text = input.trim();
      if (text === '.exit' || text === 'exit') {
        terminate();
      }
      return handler(text);
    })
    .catch(err => message.error(err.message))
    .finally(perform);
}

function app() {
  try {
    process.chdir(homedir());
  } catch (err) {
    message.error(err.message);
  }

  message.welcome(username);
  message.help();
  message.stdin();

  perform();
}

app();
