import { fileURLToPath } from 'url';

/**
 * @param {string} fileUrl file url or `import.meta.url`
 * @returns {string} __filename
 */
export function getFilePath(fileUrl) {
  /** __filename */
  const filePath = fileURLToPath(fileUrl);

  return filePath;
}
