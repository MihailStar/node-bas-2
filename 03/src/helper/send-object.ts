import { Response } from '../types';

function sendObject<Obj extends object = Record<string, any>>(
  res: Response,
  object: Obj
): void {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(object));
}

export { sendObject };
