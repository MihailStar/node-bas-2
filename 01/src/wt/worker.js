import { parentPort, workerData } from 'worker_threads';

/**
 * @param {number} n
 * @returns {number}
 */
export const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

/**
 * @returns {void}
 */
export const sendResult = () => {
  parentPort.postMessage(nthFibonacci(workerData));
};

// for check
sendResult();
