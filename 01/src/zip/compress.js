import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { unlink } from 'fs/promises';
import { getDirPath } from '../utility/get-dir-path.js';

const isDeleting = true;

/**
 * @throws {Error}
 * @returns {Promise<void>}
 */
export const compress = async () => {
  try {
    const rootDirPath = getDirPath(import.meta.url);
    const inputFileName = 'fileToCompress.txt';
    const inputFilePath = join(rootDirPath, 'files', inputFileName);
    const outputFileName = 'archive.gz';
    const outputFilePath = join(rootDirPath, 'files', outputFileName);

    const readStream = createReadStream(inputFilePath);
    /** gzip transform stream */
    const gzip = createGzip();
    const writeStream = createWriteStream(outputFilePath);

    await pipeline(readStream, gzip, writeStream);

    if (isDeleting) {
      await unlink(inputFilePath);
    }
  } catch {
    throw new Error('Operation failed');
  }
};

// for check
compress();
