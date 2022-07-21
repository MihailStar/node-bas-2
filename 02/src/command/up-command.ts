import { join } from 'path';
import { AbstractCommand } from './abstract-command';

class UpCommand extends AbstractCommand {
  protected async executor(): Promise<void> {
    const cwd = process.cwd();

    process.chdir(join(cwd, '..'));
  }
}

export { UpCommand };
