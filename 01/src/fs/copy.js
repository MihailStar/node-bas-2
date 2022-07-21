import { readdir, stat, mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Stats /* , createReadStream, createWriteStream */ } from 'fs';
/* import { pipeline } from 'stream/promises'; */
import { getDirPath } from '../utility/get-dir-path.js';

/**
 * @throws {Error}
 * @returns {never}
 */
function handleError() {
  throw new Error('FS operation failed');
}

/**
 * @param {string} inputDirPath
 * @param {string} outputDirPath
 * @returns {Promise<void>}
 * @todo rewrite to `async` `await`
 */
function copyDir(inputDirPath, outputDirPath) {
  return readdir(inputDirPath)
    .then((fileOrDirNames) => {
      /** @type {Promise<[string, Stats]>[]} */
      const fileOrDirNameAndStatsPromises = [];

      fileOrDirNames.forEach((fileOrDirName, index) => {
        const fileOrDirNamePath = join(inputDirPath, fileOrDirName);
        const statsPromise = stat(fileOrDirNamePath);

        fileOrDirNameAndStatsPromises.push(
          Promise.all([Promise.resolve(fileOrDirNames[index]), statsPromise])
        );
      });

      return Promise.all(fileOrDirNameAndStatsPromises);
    })
    .then((fileOrDirNameAndStats) => {
      /** @todo add `await` */
      mkdir(outputDirPath).catch(handleError);

      /** @type {Promise<void>[]} */
      const readFileWriteFilePromises = [];

      fileOrDirNameAndStats.forEach(([fileOrDirName, stats]) => {
        if (stats.isDirectory()) {
          const dirName = fileOrDirName;
          const nestedInputDirPath = join(inputDirPath, dirName);
          const nestedOutputDirPath = join(outputDirPath, dirName);

          copyDir(nestedInputDirPath, nestedOutputDirPath).catch(handleError);

          return;
        }

        /*
        const fileName = fileOrDirName;
        const readStreamPath = join(inputDirPath, fileName);
        const readStream = createReadStream(readStreamPath);
        const writeStreamPath = join(outputDirPath, fileName);
        const writeStream = createWriteStream(writeStreamPath);

        pipeline(readStream, writeStream).catch(handleError);
        */

        const fileName = fileOrDirName;
        const inputFilePath = join(inputDirPath, fileName);
        const outputFilePath = join(outputDirPath, fileName);

        readFileWriteFilePromises.push(
          readFile(inputFilePath).then((data) =>
            writeFile(outputFilePath, data)
          )
        );
      });

      return Promise.all(readFileWriteFilePromises);
    })
    .then();
}

/**
 * @throws {Error}
 * @returns {Promise<void>}
 */
export const copy = async () => {
  try {
    const rootDirPath = getDirPath(import.meta.url);
    const inputDirName = 'files';
    const inputDirPath = join(rootDirPath, inputDirName);
    const outputDirName = `${inputDirName}_copy`;
    const outputDirPath = join(rootDirPath, outputDirName);

    await copyDir(inputDirPath, outputDirPath);
  } catch {
    handleError();
  }
};

// for check
copy();
