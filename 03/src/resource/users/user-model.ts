import { v4 as uuid, validate, version } from 'uuid';
import { isString } from '../../utility/is-string';
import { isInteger } from '../../utility/is-integer';
import { isStringArray } from '../../utility/is-string-array';
import { isKeyInObject } from '../../utility/is-key-in-object';

interface User {
  username: string;
  age: number;
  hobbies: string[];
}

interface UserWithId extends User {
  id: string;
}

const users: UserWithId[] = [];
const userIdToUserIndex: Record<UserWithId['id'], number> = {};

class UserModel {
  static async create(user: User): Promise<UserWithId> {
    const createdUser: UserWithId = { id: uuid(), ...user };

    userIdToUserIndex[createdUser.id] = users.length;
    users.push(createdUser);

    return createdUser;
  }

  static async read(): Promise<UserWithId[]>;
  static async read(id: UserWithId['id']): Promise<UserWithId | null>;

  static async read(
    id?: UserWithId['id']
  ): Promise<UserWithId[] | UserWithId | null> {
    if (id === undefined) return users;

    const userIndex = userIdToUserIndex[id];
    if (userIndex === undefined) return null;

    const foundUser = users[userIndex];

    return foundUser;
  }

  static async update(
    id: UserWithId['id'],
    user: User
  ): Promise<UserWithId | null> {
    const userIndex = userIdToUserIndex[id];
    if (userIndex === undefined) return null;

    const updatedUser: UserWithId = { id: users[userIndex].id, ...user };
    users[userIndex] = updatedUser;

    return updatedUser;
  }

  static async delete(id: UserWithId['id']): Promise<UserWithId | null> {
    const userIndex = userIdToUserIndex[id];
    if (userIndex === undefined) return null;

    const [deletedUser] = users.splice(userIndex, 1);

    return deletedUser;
  }

  static isId(candidate: string): candidate is UserWithId['id'] {
    const isValid = validate(candidate) && version(candidate) === 4;

    return isValid;
  }

  static isUser(candidate: object): candidate is User {
    type Validator = (value: unknown) => boolean;
    const userKeyToValidator: Record<keyof User, Validator> = {
      username: isString,
      age: isInteger,
      hobbies: isStringArray,
    };

    return Object.entries(userKeyToValidator).every(([userKey, validator]) => {
      if (!isKeyInObject(userKey, candidate)) return false;

      const isValid = validator(candidate[userKey]);

      return isValid;
    });
  }
}

export { User, UserModel };
