import { stat } from 'fs/promises';

async function isDir(dirPath: string): Promise<boolean> {
  const stats = await stat(dirPath);

  return stats.isDirectory();
}

export { isDir };
