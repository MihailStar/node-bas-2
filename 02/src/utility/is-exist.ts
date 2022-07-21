import { access } from 'fs/promises';
import { constants, accessSync } from 'fs';

async function isExist(fileOrDirPath: string): Promise<boolean> {
  try {
    await access(fileOrDirPath, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

function isExistSync(fileOrDirPath: string): boolean {
  try {
    accessSync(fileOrDirPath, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export { isExist, isExistSync };
