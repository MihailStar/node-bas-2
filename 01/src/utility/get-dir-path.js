import { dirname } from 'path';
import { getFilePath } from './get-file-path.js';

/**
 * @param {string} fileUrl file url or `import.meta.url`
 * @returns {string} __dirname
 */
export function getDirPath(fileUrl) {
  /** __filename */
  const filePath = getFilePath(fileUrl);
  /** __dirname */
  const directoryPath = dirname(filePath);

  return directoryPath;
}
