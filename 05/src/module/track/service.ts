import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { ForbiddenError } from 'apollo-server';
import { configuration } from '../../common/configuration';
import type {
  InputType as TrackInputType,
  OutputType as TrackOutputType,
} from './type';
import type { WithPagination } from '../../common/type';

const { TRACK_URL } = configuration;

const trackService = {
  /**
   * @throws {ForbiddenError}
   */
  async create(
    dto: TrackInputType,
    authorization: string
  ): Promise<TrackOutputType> {
    const body = JSON.stringify(dto);
    const response = await fetch(TRACK_URL, {
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

    const data = (await response.json()) as TrackOutputType;

    return data;
  },

  async readAll(
    limit = 5,
    offset = 0
  ): Promise<WithPagination<TrackOutputType>> {
    const response = await fetch(
      `${TRACK_URL}?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = (await response.json()) as WithPagination<TrackOutputType>;

    return data;
  },

  async read(id: TrackOutputType['_id']): Promise<TrackOutputType | null> {
    const response = await fetch(`${TRACK_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.headers.get('Content-Length') === '0') {
      return null;
    }

    const data = (await response.json()) as TrackOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async update(
    id: TrackOutputType['_id'],
    dto: Partial<TrackInputType>,
    authorization: string
  ): Promise<TrackOutputType | null> {
    const body = JSON.stringify(dto);
    const response = await fetch(`${TRACK_URL}/${id}`, {
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

    const data = (await response.json()) as TrackOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async delete(
    id: TrackOutputType['_id'],
    authorization: string
  ): Promise<TrackOutputType | null> {
    const data = await this.read(id);

    if (data === null) {
      return null;
    }

    const response = await fetch(`${TRACK_URL}/${id}`, {
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

export { trackService as service };
