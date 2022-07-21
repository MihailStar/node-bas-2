import { IncomingMessage, ServerResponse } from 'http';

type RequestParamsDefault = Record<string, string>;
type RequestBodyDefault = Record<string, any>;

type Request<
  Params extends object = RequestParamsDefault,
  Body extends object = RequestBodyDefault
> = IncomingMessage & { params: Params; body: Body };
type Response = ServerResponse;

// global.d.ts
declare global {}

export { RequestParamsDefault, RequestBodyDefault, Request, Response };
