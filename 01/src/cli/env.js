import { EOL } from 'os';

/**
 * @returns {void}
 */
export const parseEnv = () => {
  const prefix = 'RSS_';
  let result = '';

  Object.entries(process.env).forEach(([key, value]) => {
    if (key.startsWith(prefix)) {
      result += `${key}=${value}; `;
    }
  });

  if (result.length === 0) {
    return;
  }

  process.stdout.write(result.slice(0, -2));
  process.stdout.write(EOL);
};

// for check
parseEnv();
