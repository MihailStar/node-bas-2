import { join } from 'path';
import { createWriteStream } from 'fs';
import { createInterface } from 'readline';
import { EOL } from 'os';
import { once } from 'events';
import { getDirPath } from '../utility/get-dir-path.js';

const isAppending = true;

/**
 * @returns {Promise<void>}
 */
export const write = async () => {
  try {
    const filePath = join(
      getDirPath(import.meta.url),
      'files',
      'fileToWrite.txt'
    );
    const writeStream = createWriteStream(filePath, {
      flags: isAppending ? 'a' : 'w',
    });
    const readlineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    readlineInterface
      .on('line', (input) => {
        writeStream.write(input);
        writeStream.write(EOL);

        readlineInterface.prompt();
      })
      .on('close', () => {
        writeStream.close();
      })
      .prompt();

    await once(readlineInterface, 'close');

    return;
  } catch {
    throw new Error('Operation failed');
  }
};

// for check
write();
