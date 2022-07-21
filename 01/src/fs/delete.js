import { join } from 'path';
import { unlink } from 'fs/promises';
import { getDirPath } from '../utility/get-dir-path.js';

/**
 * @throws {Error}
 * @returns {Promise<void>}
 */
export const remove = async () => {
  try {
    const rootDirPath = getDirPath(import.meta.url);
    const dirName = 'files';
    const fileName = 'fileToRemove.txt';
    const filePath = join(rootDirPath, dirName, fileName);

    await unlink(filePath);
  } catch {
    throw new Error('FS operation failed');
  }
};

// for check
remove();
