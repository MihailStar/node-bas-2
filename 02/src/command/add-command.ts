import { open } from 'fs/promises';
import { AbstractCommand } from './abstract-command';

class AddCommand extends AbstractCommand {
  protected async executor(filePath: string): Promise<void> {
    const fileHandle = await open(filePath, 'wx');
    /* const writeStream = fileHandle.createWriteStream(); // for example */

    await fileHandle.close();
  }
}

export { AddCommand };
