import { join } from 'path';
import { Worker } from 'worker_threads';
import { cpus, EOL } from 'os';
import { getDirPath } from '../utility/get-dir-path.js';

/**
 * @param {number} data
 * @returns {Promise<number>}
 */
function createPromisedWorker(data) {
  const workerName = 'worker.js';
  const workerPath = join(getDirPath(import.meta.url), workerName);

  return new Promise((resolve, reject) => {
    new Worker(workerPath, { workerData: data })
      .on('message', resolve)
      .on('error', reject);
  });
}

/**
 * @returns {Promise<{ status: 'resolved' | 'error'; data: number | null }[]>}
 */
export const performCalculations = async () => {
  try {
    const numberOfCpu = cpus().length;
    const initialNumber = 10;
    /** @type {Promise<number>[]} */
    const promisedWorkers = [];

    for (let index = 0; index < numberOfCpu; index += 1) {
      const promisedWorker = createPromisedWorker(initialNumber + index);

      promisedWorkers.push(promisedWorker);
    }

    return (await Promise.allSettled(promisedWorkers)).map((result) => {
      if (result.status === 'rejected') {
        return { status: 'error', data: null };
      }

      return { status: 'resolved', data: result.value };
    });
  } catch {
    throw new Error('Operation failed');
  }
};

// for check
(async () => {
  process.stdout.write(JSON.stringify(await performCalculations(), null, '  '));
  process.stdout.write(EOL);
})();
