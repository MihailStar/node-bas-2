import { join } from 'path';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { EOL } from 'os';
import { getDirPath } from '../utility/get-dir-path.js';

/**
 * @returns {Promise<void>}
 */
export const read = async () => {
  try {
    const filePath = join(
      getDirPath(import.meta.url),
      'files',
      'fileToRead.txt'
    );
    const readStream = createReadStream(filePath);
    const writeStream = process.stdout;

    readStream.once('end', () => {
      writeStream.write(EOL);
    });

    await pipeline(readStream, writeStream);
  } catch {
    throw new Error('Operation failed');
  }
};

// for check
read();
