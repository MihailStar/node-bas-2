import { join } from 'path';
import { readdir } from 'fs/promises';
import { EOL } from 'os';
import { getDirPath } from '../utility/get-dir-path.js';

/**
 * @throws {Error}
 * @returns {Promise<void>}
 */
export const list = async () => {
  try {
    const rootDirPath = getDirPath(import.meta.url);
    const dirName = 'files';
    const dirPath = join(rootDirPath, dirName);
    const fileOrDirNames = await readdir(dirPath);

    process.stdout.write(JSON.stringify(fileOrDirNames, null, '  '));
    process.stdout.write(EOL);
  } catch {
    throw new Error('FS operation failed');
  }
};

// for check
list();
