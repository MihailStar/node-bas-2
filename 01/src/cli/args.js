import { EOL } from 'os';

/**
 * @returns {void}
 */
export const parseArgs = () => {
  const prefix = '--';
  let result = '';

  for (let index = 2; index < process.argv.length; index += 1) {
    const key = process.argv[index];
    /** @type {string | undefined} */
    const value = process.argv[index + 1];

    if (key.startsWith(prefix)) {
      result += `${key.slice(2)} is ${value ?? ''}, `;
      index += 1;
    }
  }

  if (result.length === 0) {
    return;
  }

  process.stdout.write(result.slice(0, -2));
  process.stdout.write(EOL);
};

// for check
parseArgs();
