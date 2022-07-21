import { Request } from '../types';
import { HttpError } from './http-error';
import { StatusCode } from '../common/status-code';
import { isObject } from '../utility/is-object';

/**
 * @type maybe check content-type
 */
async function parseBody(req: Request): Promise<void> {
  return new Promise((resolve, reject) => {
    let body = '';

    req
      .on('error', (error) => {
        reject(error);
      })
      .on('end', () => {
        try {
          if (body.length === 0) {
            resolve();
            return;
          }

          let parsedBody: unknown;

          try {
            parsedBody = JSON.parse(body) as unknown;
          } catch (error) {
            throw new HttpError('Body is invalid', StatusCode.BAD_REQUEST);
          }

          if (!isObject(parsedBody)) {
            throw new HttpError('Body must be object', StatusCode.BAD_REQUEST);
          }

          req.body = parsedBody;

          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('data', (chunk) => {
        try {
          body += chunk;
        } catch (error) {
          reject(error);
        }
      });
  });
}

export { parseBody };
