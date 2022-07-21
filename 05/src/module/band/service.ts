import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { ForbiddenError } from 'apollo-server';
import { configuration } from '../../common/configuration';
import type {
  InputType as BandInputType,
  OutputType as BandOutputType,
} from './type';
import type { WithPagination } from '../../common/type';

const { BAND_URL } = configuration;

const bandService = {
  /**
   * @throws {ForbiddenError}
   */
  async create(
    dto: BandInputType,
    authorization: string
  ): Promise<BandOutputType> {
    const body = JSON.stringify(dto);
    const response = await fetch(BAND_URL, {
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

    const data = (await response.json()) as BandOutputType;

    return data;
  },

  async readAll(
    limit = 5,
    offset = 0
  ): Promise<WithPagination<BandOutputType>> {
    const response = await fetch(
      `${BAND_URL}?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = (await response.json()) as WithPagination<BandOutputType>;

    return data;
  },

  async read(id: BandOutputType['_id']): Promise<BandOutputType | null> {
    const response = await fetch(`${BAND_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.headers.get('Content-Length') === '0') {
      return null;
    }

    const data = (await response.json()) as BandOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async update(
    id: BandOutputType['_id'],
    dto: Partial<BandInputType>,
    authorization: string
  ): Promise<BandOutputType | null> {
    const body = JSON.stringify(dto);
    const response = await fetch(`${BAND_URL}/${id}`, {
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

    const data = (await response.json()) as BandOutputType;

    return data;
  },

  /**
   * @throws {ForbiddenError}
   */
  async delete(
    id: BandOutputType['_id'],
    authorization: string
  ): Promise<BandOutputType | null> {
    const data = await this.read(id);

    if (data === null) {
      return null;
    }

    const response = await fetch(`${BAND_URL}/${id}`, {
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

export { bandService as service };
