import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { ForbiddenError } from 'apollo-server';
import { configuration } from '../../common/configuration';
import type {
  InputType as GenreInputType,
  OutputType as GenreOutputType,
} from './type';
import type { WithPagination } from '../../common/type';

const { GENRE_URL } = configuration;

const genreService = {
  /**
   * @throws {ForbiddenError}
   */
  async create(
    dto: GenreInputType,
    authorization: string
  ): Promise<GenreOutputType> {
    const body = JSON.stringify(dto);
    const response = await fetch(GENRE_URL, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.status === StatusCodes.FORBIDDEN) {
      throw new ForbiddenError('Bad token');
    }

    const data = (await response.json()) as GenreOutputType;

    return data;
  },

  async readAll(
    limit = 5,
    offset = 0
  ): Promise<WithPagination<GenreOutputType>> {
    const response = await fetch(
      `${GENRE_URL}?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = (await response.json()) as WithPagination<GenreOutputType>;

    return data;
  },

  async read(id: GenreOutputType['_id']): Promise<GenreOutputType | null> {
    const response = await fetch(`${GENRE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.headers.get('Content-Length') === '0') {
      return null;
    }

    const data = (await response.json()) as GenreOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async update(
    id: GenreOutputType['_id'],
    dto: Partial<GenreInputType>,
    authorization: string
  ): Promise<GenreOutputType | null> {
    const body = JSON.stringify(dto);
    const response = await fetch(`${GENRE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.status === StatusCodes.FORBIDDEN) {
      throw new ForbiddenError('Bad token');
    }

    if (response.headers.get('Content-Length') === '0') {
      return null;
    }

    const data = (await response.json()) as GenreOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async delete(
    id: GenreOutputType['_id'],
    authorization: string
  ): Promise<GenreOutputType | null> {
    const data = await this.read(id);

    if (data === null) {
      return null;
    }

    const response = await fetch(`${GENRE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === StatusCodes.FORBIDDEN) {
      throw new ForbiddenError('Bad token');
    }

    return data;
  },
};

export { genreService as service };
