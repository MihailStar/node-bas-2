import { StatusCode } from '../common/status-code';

type HttpStatusCode = typeof StatusCode[keyof typeof StatusCode];

class HttpError extends Error {
  readonly statusCode: HttpStatusCode;

  constructor(message: string, statusCode?: HttpStatusCode) {
    super();

    this.message = message;
    this.name = 'HttpError';
    this.statusCode = statusCode ?? StatusCode.INTERNAL_SERVER_ERROR;
  }
}

export { HttpError };
