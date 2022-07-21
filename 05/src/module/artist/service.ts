import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { ForbiddenError } from 'apollo-server';
import { configuration } from '../../common/configuration';
import type {
  InputType as ArtistInputType,
  OutputType as ArtistOutputType,
} from './type';
import type { WithPagination } from '../../common/type';

const { ARTIST_URL } = configuration;

const artistService = {
  /**
   * @throws {ForbiddenError}
   */
  async create(
    dto: ArtistInputType,
    authorization: string
  ): Promise<ArtistOutputType> {
    const body = JSON.stringify(dto);
    const response = await fetch(ARTIST_URL, {
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

    const data = (await response.json()) as ArtistOutputType;

    return data;
  },

  async readAll(
    limit = 5,
    offset = 0
  ): Promise<WithPagination<ArtistOutputType>> {
    const response = await fetch(
      `${ARTIST_URL}?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = (await response.json()) as WithPagination<ArtistOutputType>;

    return data;
  },

  async read(id: ArtistOutputType['_id']): Promise<ArtistOutputType | null> {
    const response = await fetch(`${ARTIST_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.headers.get('Content-Length') === '0') {
      return null;
    }

    const data = (await response.json()) as ArtistOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async update(
    id: ArtistOutputType['_id'],
    dto: Partial<ArtistInputType>,
    authorization: string
  ): Promise<ArtistOutputType | null> {
    const body = JSON.stringify(dto);
    const response = await fetch(`${ARTIST_URL}/${id}`, {
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

    const data = (await response.json()) as ArtistOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async delete(
    id: ArtistOutputType['_id'],
    authorization: string
  ): Promise<ArtistOutputType | null> {
    const data = await this.read(id);

    if (data === null) {
      return null;
    }

    const response = await fetch(`${ARTIST_URL}/${id}`, {
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

export { artistService as service };
