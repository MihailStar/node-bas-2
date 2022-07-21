import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';
import { AbstractCommand } from './abstract-command';
import { print } from '../utility/print';

class HashCommand extends AbstractCommand {
  protected async executor(filePath: string): Promise<void> {
    const readStream = createReadStream(filePath);
    const transformStream = createHash('sha256');

    await pipeline(readStream, transformStream);

    print(transformStream.digest('hex'));
  }
}

export { HashCommand };
