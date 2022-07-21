import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

/**
 * @param fileUrl file url or `import.meta.url`
 */
function getPath(fileUrl: string, ...paths: string[]): string {
  /** __filename */
  const filePath = fileURLToPath(fileUrl);
  /** __dirname */
  const dirPath = dirname(filePath);

  return join(dirPath, ...paths);
}

export { getPath };
