import { rename } from 'fs/promises';
import { AbstractCommand } from './abstract-command';
import { isExist } from '../utility/is-exist';
import { OperationError } from '../error/operation-error';

class RnCommand extends AbstractCommand {
  /**
   * @throws {OperationError}
   * @todo rewrite to `isFileExistSync` or `fs.existsSync`, better
   */
  protected async executor(
    filePath: string,
    newFilePath: string
  ): Promise<void> {
    if (await isExist(newFilePath)) {
      throw new OperationError('Code: EEXIST');
    }

    await rename(filePath, newFilePath);
  }
}

export { RnCommand };
