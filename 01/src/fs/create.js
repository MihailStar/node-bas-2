import { join } from 'path';
import { writeFile } from 'fs/promises';
import { getDirPath } from '../utility/get-dir-path.js';

/**
 * @throws {Error}
 * @returns {Promise<void>}
 */
export const create = async () => {
  try {
    const filePath = join(getDirPath(import.meta.url), 'files', 'fresh.txt');

    await writeFile(filePath, 'I am fresh and young', { flag: 'wx' });
  } catch {
    throw new Error('FS operation failed');
  }
};

// for check
create();
