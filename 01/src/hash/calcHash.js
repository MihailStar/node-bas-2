import { join } from 'path';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';
import { EOL } from 'os';
import { getDirPath } from '../utility/get-dir-path.js';

/**
 * @throws {Error}
 * @returns {Promise<string>}
 */
export const calculateHash = async () => {
  try {
    const dirName = 'files';
    const dirPath = getDirPath(import.meta.url);
    const fileName = 'fileToCalculateHashFor.txt';
    const filePath = join(dirPath, dirName, fileName);

    const readStream = createReadStream(filePath);
    const transformStream = createHash('sha256');

    await pipeline(readStream, transformStream);

    return transformStream.digest('hex');
  } catch {
    throw new Error('Operation failed');
  }
};

// for check
(async () => {
  process.stdout.write(await calculateHash());
  process.stdout.write(EOL);
})();
