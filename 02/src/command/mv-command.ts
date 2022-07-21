import { AbstractCommand } from './abstract-command';
import { CpCommand } from './cp-command';
import { RmCommand } from './rm-command';

class MvCommand extends AbstractCommand {
  protected async executor(
    filePath: string,
    newDirPath: string
  ): Promise<void> {
    await new CpCommand().execute(filePath, newDirPath);
    await new RmCommand().execute(filePath);
  }
}

export { MvCommand };
