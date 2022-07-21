import { configuration } from '../common/configuration';
import { Response } from '../types';
import { HttpError } from './http-error';
import { StatusCode } from '../common/status-code';
import { sendObject } from './send-object';

const { isDevelopment } = configuration;

function handleError(res: Response, error: unknown): void {
  const errorMessage =
    error instanceof Error ? error.message : 'Internal server error';
  const errorObject: { message: string; reason?: unknown } = isDevelopment
    ? { message: errorMessage, reason: error }
    : { message: errorMessage };

  res.statusCode =
    error instanceof HttpError
      ? error.statusCode
      : StatusCode.INTERNAL_SERVER_ERROR;

  return sendObject(res, errorObject);
}

export { handleError };
