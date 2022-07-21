import { access } from 'fs/promises';
import { constants } from 'fs';

/**
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
export async function isFileExist(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}
