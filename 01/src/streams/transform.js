import { createInterface } from 'readline';
import { Transform } from 'stream';
import { EOL } from 'os';
import { once } from 'events';
import { reverseString } from '../utility/reverse-string.js';
import { escapeCode } from '../utility/escape-code.js';

/**
 * @returns {Promise<void>}
 */
export const transform = async () => {
  try {
    const readlineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    /**
     * @tutorial https://habr.com/ru/post/479048
     */
    const transformStream = new Transform({
      transform(chunk, _unusedEncoding, callback) {
        try {
          /*
          this.push(reverseString(String(chunk)));
          callback(null);
          */
          callback(null, reverseString(String(chunk)));
        } catch (error) {
          callback(error);
        }
      },
    });

    transformStream.on('data', (chunk) => {
      const response = `< ${escapeCode.reverse}${chunk}${escapeCode.reset}${EOL}`;

      process.stdout.write(response, () => {
        readlineInterface.prompt();
      });
    });

    readlineInterface
      .on('line', (input) => {
        transformStream.write(input);
      })
      .on('close', () => {
        process.stdout.write(EOL);
      })
      .prompt();

    await once(readlineInterface, 'close');

    return;
  } catch {
    throw new Error('Operation failed');
  }
};

// for check
transform();
