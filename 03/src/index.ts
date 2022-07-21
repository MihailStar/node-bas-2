import { createServer } from 'http';
import { EOL } from 'os';
import { configuration } from './common/configuration';
import { handleRequest } from './helper/handle-request';
import { ErrorCode } from './common/error-code';

const { PORT } = configuration;

createServer(handleRequest)
  .on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === ErrorCode.PERMISSION_DENIED) {
      const message = `Port ${PORT} busy${EOL}`;

      throw new Error(message);
    }
  })
  .listen(PORT, () => {
    const message = `http://localhost:${PORT}${EOL}`;

    process.stdout.write(message);
  });
