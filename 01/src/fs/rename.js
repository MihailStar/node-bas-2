import { join } from 'path';
import { rename as fsRename } from 'fs/promises';
import { getDirPath } from '../utility/get-dir-path.js';
import { isFileExist } from '../utility/is-file-exist.js';

/**
 * @throws {Error}
 * @returns {Promise<void>}
 */
export const rename = async () => {
  try {
    const rootDirPath = getDirPath(import.meta.url);
    const dirName = 'files';
    const oldFileName = 'wrongFilename.txt';
    const oldFileNamePath = join(rootDirPath, dirName, oldFileName);
    const newFileName = 'properFilename.md';
    const newFileNamePath = join(rootDirPath, dirName, newFileName);

    if (await isFileExist(newFileNamePath)) {
      throw new Error('Already exists');
    }

    await fsRename(oldFileNamePath, newFileNamePath);
  } catch {
    throw new Error('FS operation failed');
  }
};

// for check
rename();
