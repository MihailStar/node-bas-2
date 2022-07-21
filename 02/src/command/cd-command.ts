import { isAbsolute, join } from 'path';
import { AbstractCommand } from './abstract-command';

class CdCommand extends AbstractCommand {
  protected async executor(dirPath: string): Promise<void> {
    const cwd = process.cwd();
    const absolutePath = isAbsolute(dirPath) ? dirPath : join(cwd, dirPath);

    process.chdir(absolutePath);
  }
}

export { CdCommand };
