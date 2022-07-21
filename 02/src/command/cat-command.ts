import { createReadStream } from 'fs';
import { once } from 'events';
import { AbstractCommand } from './abstract-command';
import { print } from '../utility/print';

class CatCommand extends AbstractCommand {
  protected async executor(filePath: string): Promise<void> {
    const readStream = createReadStream(filePath);
    const writeStream = process.stdout;

    readStream
      .on('end', () => {
        print();
        readStream.close();
      })
      .on('data', (chunk) => {
        writeStream.write(chunk);
      });

    await once(readStream, 'close');
  }
}

export { CatCommand };
