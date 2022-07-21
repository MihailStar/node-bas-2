import { cpus, EOL } from 'os';
import cluster from 'cluster';
import { createServer } from 'http';
import { configuration } from './common/configuration';
import { handleRequest } from './helper/handle-request';

const { length: numberOfCores } = cpus();
const { PORT } = configuration;

if (cluster.isPrimary) {
  cluster.on('exit', () => {
    cluster.fork();
  });

  for (let i = 0; i < numberOfCores; i += 1) {
    cluster.fork();
  }
} else {
  /** @todo: rewrite (one DB for all forks), this solution not correct */
  createServer(handleRequest).listen(PORT, () => {
    const message = `http://localhost:${PORT}${EOL}`;

    process.stdout.write(message);
  });
}
