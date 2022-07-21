import { HTTPMethod } from '../common/http-method';
import { Request, Response } from '../types';

/**
 * @example
 * ```
 * createRegex('/api/users/{userId}/?'); // -> /^\/api\/users\/(?<userId>[0-9a-z-]+)\/?$/
 * ``` /^\/api\/users\/(?<userId>[0-9a-z-]+)\/?$/
 */
function createRegex(pathOrPathWithMask: string): RegExp {
  const pattern = pathOrPathWithMask.replaceAll(
    /\{(.+?)\}/g,
    (_match, group: string) => `(?<${group}>[0-9a-z-]+)`
  );

  return new RegExp(`^${pattern}$`);
}

type RouteMethod = typeof HTTPMethod[keyof typeof HTTPMethod];
type RouteHandler = (req: Request, res: Response) => Promise<void>;
type RouteMethodToHandlers = Partial<Record<RouteMethod, RouteHandler[]>>;
type Route = {
  [pathOrPathWithMask: string]: {
    pathRegex: RegExp;
    methodToHandlers: RouteMethodToHandlers;
  };
};

class Router {
  #route: Route = {};

  setHandler(
    method: RouteMethod,
    pathOrPathWithMask: string,
    handler: RouteHandler
  ): this {
    if (this.#route[pathOrPathWithMask] === undefined) {
      const pathRegex = createRegex(pathOrPathWithMask);
      const methodToHandlers = { [method]: [handler] };

      this.#route[pathOrPathWithMask] = { pathRegex, methodToHandlers };

      return this;
    }

    const handlers = this.#route[pathOrPathWithMask].methodToHandlers[method];
    this.#route[pathOrPathWithMask].methodToHandlers[method] =
      handlers === undefined ? [handler] : [...handlers, handler];

    return this;
  }

  post(pathOrPathWithMask: string, handler: RouteHandler): this {
    return this.setHandler(HTTPMethod.POST, pathOrPathWithMask, handler);
  }

  get(pathOrPathWithMask: string, handler: RouteHandler): this {
    return this.setHandler(HTTPMethod.GET, pathOrPathWithMask, handler);
  }

  put(pathOrPathWithMask: string, handler: RouteHandler): this {
    return this.setHandler(HTTPMethod.PUT, pathOrPathWithMask, handler);
  }

  delete(pathOrPathWithMask: string, handler: RouteHandler): this {
    return this.setHandler(HTTPMethod.DELETE, pathOrPathWithMask, handler);
  }

  getHandler(method: RouteMethod, path: string): RouteHandler | null {
    for (const pathOrPathWithMask in this.#route) {
      if (
        Object.prototype.hasOwnProperty.call(this.#route, pathOrPathWithMask)
      ) {
        const { pathRegex, methodToHandlers } = this.#route[pathOrPathWithMask];
        const match = path.match(pathRegex);
        const handlers = methodToHandlers[method];

        if (match === null || handlers === undefined) continue;

        return async (req: Request, res: Response): Promise<void> => {
          const promises: Promise<void>[] = [];

          if (match.groups !== undefined) req.params = match.groups;

          handlers.forEach((handler) => {
            promises.push(handler(req, res));
          });

          await Promise.all(promises);
        };
      }
    }

    return null;
  }
}

export { Router };
