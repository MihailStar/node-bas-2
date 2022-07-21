import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createUnzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { unlink } from 'fs/promises';
import { getDirPath } from '../utility/get-dir-path.js';

const isDeleting = true;

/**
 * @throws {Error}
 * @returns {Promise<void>}
 */
export const decompress = async () => {
  try {
    const rootDirPath = getDirPath(import.meta.url);
    const inputFileName = 'archive.gz';
    const inputFilePath = join(rootDirPath, 'files', inputFileName);
    const outputFileName = 'fileToCompress.txt';
    const outputFilePath = join(rootDirPath, 'files', outputFileName);

    const readStream = createReadStream(inputFilePath);
    const unzip = createUnzip();
    const writeStream = createWriteStream(outputFilePath);

    await pipeline(readStream, unzip, writeStream);

    if (isDeleting) {
      await unlink(inputFilePath);
    }
  } catch {
    throw new Error('Operation failed');
  }
};

// for check
decompress();
