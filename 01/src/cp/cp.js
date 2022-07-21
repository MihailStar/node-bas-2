import { join } from 'path';
import { fork } from 'child_process';
import { EOL } from 'os';
import { once } from 'events';
import { getDirPath } from '../utility/get-dir-path.js';
import { escapeCode } from '../utility/escape-code.js';

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export const spawnChildProcess = async (args) => {
  try {
    const childPath = join(getDirPath(import.meta.url), 'files', 'script.js');
    /**
     * `fork()` открывает **канал для общения** родительского и дочернего процесса
     * ```
     * childProcess.on('message', (m) => {});
     * childProcess.send({});
     * process.on('message', (m) => {});
     * process.send({});
     * ```
     */
    const childProcess = fork(childPath, args);

    childProcess.on('spawn', () => {
      process.stdout.write(
        `${escapeCode.reverse}Child process born${EOL}${escapeCode.reset}`
      );
    });

    childProcess.on('close', () => {
      process.stdout.write(
        `${escapeCode.reverse}Child process died${EOL}${escapeCode.reset}`
      );
    });

    await once(process, 'exit');

    return;
  } catch {
    throw new Error('Operation failed');
  }
};

// for check
(async () => {
  await spawnChildProcess(['arg1', 'arg2']);
})();
