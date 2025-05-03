import { EOL, cpus, homedir, userInfo, arch } from 'node:os';
import { message } from './message.js';

export const systemInfo = command => {
  switch (command) {
    case '--EOL': {
      console.log('Default system End-Of-Line:', JSON.stringify(EOL));
      break;
    }

    case '--cpus': {
      const cpuInfo = cpus();
      console.log(`Total CPUs: ${cpuInfo.length}`);
      console.log('CPU details:');
      console.table(
        cpuInfo.map(cpu => ({
          Model: cpu.model,
          'Clock rate (GHz)': cpu.speed / 1000,
        }))
      );
      break;
    }

    case '--homedir': {
      console.log('Home directory:', homedir());
      break;
    }

    case '--username': {
      console.log('System username:', userInfo().username);
      break;
    }

    case '--architecture': {
      console.log('CPU architecture:', arch());
      break;
    }

    default: {
      message.invalid(`unknown argument ${command}`);
    }
  }
};
