import { Router } from '../../helper/router';
import { Request, Response } from '../../types';
import { UserPresenter } from './user-presenter';

let path = '';
const userRouter = new Router();

path = '/api/users/{userId}/?';
userRouter
  .get(path, (req: Request, res: Response) =>
    UserPresenter.read(req as Request<{ userId: string }>, res)
  )
  .put(path, (req: Request, res: Response) =>
    UserPresenter.update(req as Request<{ userId: string }>, res)
  )
  .delete(path, (req: Request, res: Response) =>
    UserPresenter.delete(req as Request<{ userId: string }>, res)
  );

path = '/api/users/?';
userRouter
  .post(path, (req: Request, res: Response) => UserPresenter.create(req, res))
  .get(path, (req: Request, res: Response) => UserPresenter.read(req, res));

export { userRouter };
