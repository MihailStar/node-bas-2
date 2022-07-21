import { createRequire } from 'module';
import { release, version } from 'os';
import { sep, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer as createServerHttp } from 'http';
import './files/c.js';

const random = Math.random();

let unknownObject;

const require = createRequire(import.meta.url);
if (random > 0.5) {
  // unknownObject = (await import('./files/a.json', { assert: { type: 'json' } }))
  //   .default;
  unknownObject = require('./files/a.json');
} else {
  // unknownObject = (await import('./files/b.json', { assert: { type: 'json' } }))
  //   .default;
  unknownObject = require('./files/b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

export { unknownObject, createMyServer };
