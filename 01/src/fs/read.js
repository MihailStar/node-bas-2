import { join } from 'path';
/* import { createReadStream } from 'fs'; */
/* import { pipeline } from 'stream/promises'; */
import { readFile } from 'fs/promises';
import { EOL } from 'os';
import { getDirPath } from '../utility/get-dir-path.js';

/**
 * @throws {Error}
 * @returns {Promise<void>}
 */
export const read = async () => {
  try {
    const rootDirPath = getDirPath(import.meta.url);
    const dirName = 'files';
    const fileName = 'fileToRead.txt';
    /* const readStreamPath = join(rootDirPath, dirName, fileName); */
    /* const readStream = createReadStream(readStreamPath); */
    const filePath = join(rootDirPath, dirName, fileName);
    const fileData = await readFile(filePath);

    /*
    readStream.once('end', () => process.stdout.write(EOL));

    await pipeline(readStream, process.stdout);
    */

    process.stdout.write(fileData);
    process.stdout.write(EOL);
  } catch {
    throw new Error('FS operation failed');
  }
};

// for check
read();
