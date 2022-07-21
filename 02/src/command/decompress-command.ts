import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { AbstractCommand } from './abstract-command';

class DecompressCommand extends AbstractCommand {
  protected async executor(
    filePath: string,
    destinationPath: string
  ): Promise<void> {
    const readStream = createReadStream(filePath);
    const transformStream = createBrotliDecompress();
    const writeStream = createWriteStream(destinationPath, { flags: 'wx' });

    await pipeline(readStream, transformStream, writeStream);
  }
}

export { DecompressCommand };
