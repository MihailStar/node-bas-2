import { mkdir } from 'fs/promises';
import { join, basename } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { AbstractCommand } from './abstract-command';
import { isError } from '../utility/is-error';

class CpCommand extends AbstractCommand {
  protected async executor(
    filePath: string,
    newDirPath: string
  ): Promise<void> {
    try {
      await mkdir(newDirPath);
    } catch (error) {
      if (isError(error) && error.code !== 'EEXIST') {
        throw error;
      }
    }

    const newFilePath = join(newDirPath, basename(filePath));
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(newFilePath, { flags: 'wx' });

    await pipeline(readStream, writeStream);
  }
}

export { CpCommand };
