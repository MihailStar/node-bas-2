import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { ForbiddenError } from 'apollo-server';
import { configuration } from '../../common/configuration';
import type {
  InputType as AlbumInputType,
  OutputType as AlbumOutputType,
} from './type';
import type { WithPagination } from '../../common/type';

const { ALBUM_URL } = configuration;

const albumService = {
  /**
   * @throws {ForbiddenError}
   */
  async create(
    dto: AlbumInputType,
    authorization: string
  ): Promise<AlbumOutputType> {
    const body = JSON.stringify(dto);

    const response = await fetch(ALBUM_URL, {
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

    const data = (await response.json()) as AlbumOutputType;

    return data;
  },

  async readAll(
    limit = 5,
    offset = 0
  ): Promise<WithPagination<AlbumOutputType>> {
    const response = await fetch(
      `${ALBUM_URL}?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = (await response.json()) as WithPagination<AlbumOutputType>;

    return data;
  },

  async read(id: AlbumOutputType['_id']): Promise<AlbumOutputType | null> {
    const response = await fetch(`${ALBUM_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.headers.get('Content-Length') === '0') {
      return null;
    }

    const data = (await response.json()) as AlbumOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async update(
    id: AlbumOutputType['_id'],
    dto: Partial<AlbumInputType>,
    authorization: string
  ): Promise<AlbumOutputType | null> {
    const body = JSON.stringify(dto);
    const response = await fetch(`${ALBUM_URL}/${id}`, {
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

    const data = (await response.json()) as AlbumOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async delete(
    id: AlbumOutputType['_id'],
    authorization: string
  ): Promise<AlbumOutputType | null> {
    const data = await this.read(id);

    if (data === null) {
      return null;
    }

    const response = await fetch(`${ALBUM_URL}/${id}`, {
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

export { albumService as service };
