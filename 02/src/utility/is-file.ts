import { stat } from 'fs/promises';

async function isFile(filePath: string): Promise<boolean> {
  const stats = await stat(filePath);

  return stats.isFile();
}

export { isFile };
