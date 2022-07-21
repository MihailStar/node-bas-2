import { readdir, stat } from 'fs/promises';
import { Stats } from 'fs';
import { join, sep } from 'path';
import { AbstractCommand } from './abstract-command';
import { EscapeCode } from '../common/escape-code';
import { print } from '../utility/print';

/** flag */
const showLockedFileOrDir = false;

class LsCommand extends AbstractCommand {
  protected async executor(): Promise<void> {
    const cwd = process.cwd();
    const fileOrDirNames = await readdir(cwd);
    const fileOrDirStats: Promise<Stats>[] = [];

    fileOrDirNames.forEach((fileOrDirName) => {
      const fileOrDirPath = join(cwd, fileOrDirName);
      const fileOrDirStat = stat(fileOrDirPath);

      fileOrDirStats.push(fileOrDirStat);
    });

    const settledFileOrDirStats = await Promise.allSettled(fileOrDirStats);
    const result: string[] = [];

    settledFileOrDirStats.forEach((settledFileOrDirStat, index) => {
      const fileOrDirName = fileOrDirNames[index];

      if (settledFileOrDirStat.status === 'fulfilled') {
        const fileOrDirStat = settledFileOrDirStat.value;

        result.push(
          `${fileOrDirName}${fileOrDirStat.isDirectory() ? `${sep}` : ''}`
        );
        return;
      }

      if (showLockedFileOrDir) {
        result.push(`${EscapeCode.fgRed}${fileOrDirName}${EscapeCode.reset}`);
      }
    });

    print(...result);
  }
}

export { LsCommand };
