import { rm } from 'fs/promises';
import { AbstractCommand } from './abstract-command';

class RmCommand extends AbstractCommand {
  /**
   * @todo rewrite to `fs.unlink`, universal
   */
  protected async executor(filePath: string): Promise<void> {
    await rm(filePath);
  }
}

export { RmCommand };
