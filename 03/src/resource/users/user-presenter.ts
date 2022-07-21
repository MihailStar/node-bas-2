import { Request, RequestParamsDefault, Response } from '../../types';
import { User, UserModel } from './user-model';
import { HttpError } from '../../helper/http-error';
import { StatusCode } from '../../common/status-code';
import { sendObject } from '../../helper/send-object';

const UserPresenter = {
  async create(
    req: Request<RequestParamsDefault, Partial<User>>,
    res: Response
  ): Promise<void> {
    const { body } = req;

    if (!UserModel.isUser(body)) {
      throw new HttpError(
        'Body does not contain required fields',
        StatusCode.BAD_REQUEST
      );
    }

    const createdUser = await UserModel.create(body);

    res.statusCode = StatusCode.CREATED;
    sendObject(res, createdUser);
  },

  async read(req: Request<{ userId?: string }>, res: Response): Promise<void> {
    const { userId } = req.params;

    if (userId === undefined) {
      const foundUsers = await UserModel.read();

      res.statusCode = StatusCode.OK;
      sendObject(res, foundUsers);

      return;
    }

    if (!UserModel.isId(userId))
      throw new HttpError('User id is invalid', StatusCode.BAD_REQUEST);

    const foundUser = await UserModel.read(userId);

    if (foundUser === null)
      throw new HttpError('User not found', StatusCode.NOT_FOUND);

    res.statusCode = StatusCode.OK;
    sendObject(res, foundUser);
  },

  async update(
    req: Request<{ userId: string }, Partial<User>>,
    res: Response
  ): Promise<void> {
    const { userId } = req.params;
    const { body } = req;

    if (!UserModel.isId(userId))
      throw new HttpError('User id is invalid', StatusCode.BAD_REQUEST);

    if (!UserModel.isUser(body)) {
      throw new HttpError(
        'Body does not contain required fields',
        StatusCode.BAD_REQUEST
      );
    }

    const updatedUser = await UserModel.update(userId, body);

    if (updatedUser === null)
      throw new HttpError('User not found', StatusCode.NOT_FOUND);

    res.statusCode = StatusCode.OK;
    sendObject(res, updatedUser);
  },

  async delete(req: Request<{ userId: string }>, res: Response): Promise<void> {
    const { userId } = req.params;

    if (!UserModel.isId(userId))
      throw new HttpError('User id is invalid', StatusCode.BAD_REQUEST);

    const deletedUser = await UserModel.delete(userId);

    if (deletedUser === null)
      throw new HttpError('User not found', StatusCode.NOT_FOUND);

    res.statusCode = StatusCode.NO_CONTENT;
    /* sendObject(res, deletedUser); */
    res.end();
  },
};

export { UserPresenter };
