import { IncomingMessage, ServerResponse } from 'http';
import { Request, Response } from '../types';
import { parseBody } from './parse-body';
import { HttpError } from './http-error';
import { StatusCode } from '../common/status-code';
import { HTTPMethod } from '../common/http-method';
import { userRouter } from '../resource/users/user-router';
import { handleError } from './handle-error';

async function handleRequest(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  const req = request as Request;
  const res = response as Response;

  req.params = {};
  req.body = {};

  try {
    await parseBody(req);

    const { method, url } = req;

    if (method === undefined)
      throw new HttpError('HTTP method required', StatusCode.BAD_REQUEST);

    type RouteMethod = typeof HTTPMethod[keyof typeof HTTPMethod];
    const handler = userRouter.getHandler(method as RouteMethod, url!);

    if (handler === null)
      throw new HttpError('Resource not found', StatusCode.NOT_FOUND);

    await handler(req, res);
  } catch (error) {
    handleError(res, error);
  }
}

export { handleRequest };
