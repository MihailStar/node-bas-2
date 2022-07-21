import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { AbstractCommand } from './abstract-command';

/** flag */
const addCompressorExtension = false;
const compressorExtension = '.br';

class CompressCommand extends AbstractCommand {
  protected async executor(
    filePath: string,
    destinationPath: string
  ): Promise<void> {
    const destinationPathWithExtension = addCompressorExtension
      ? destinationPath.endsWith(compressorExtension)
        ? destinationPath
        : `${destinationPath}${compressorExtension}`
      : destinationPath;

    const readStream = createReadStream(filePath);
    const transformStream = createBrotliCompress();
    const writeStream = createWriteStream(destinationPathWithExtension, {
      flags: 'wx',
    });

    await pipeline(readStream, transformStream, writeStream);
  }
}

export { CompressCommand };
