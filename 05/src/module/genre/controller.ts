import type {
  OutputType as GenreOutputType,
  Scheme as GenreScheme,
  Dto as GenreDto,
} from './type';
import { service as genreService } from './service';
import type { WithPagination } from '../../common/type';

async function formResponseObject(
  data: GenreOutputType | null
): Promise<GenreScheme | null> {
  if (data === null) {
    return null;
  }

  const { _id: id, year, ...rest } = data;

  return year === undefined
    ? { id, ...rest }
    : { id, year: Number(year), ...rest };
}

const genreController = {
  async create(dto: GenreDto, authorization: string): Promise<GenreScheme> {
    const { year, ...rest } = dto;
    const genre = await genreService.create(
      year === undefined ? rest : { year: String(year), ...rest },
      authorization
    );
    const responseObject = (await formResponseObject(genre)) as GenreScheme;

    return responseObject;
  },

  async readAll(
    limit?: number,
    offset?: number
  ): Promise<WithPagination<GenreScheme>> {
    const { items: genres, ...rest } = await genreService.readAll(
      limit,
      offset
    );
    const responseObjects = (await Promise.all(
      genres.map(formResponseObject)
    )) as GenreScheme[];

    return { items: responseObjects, ...rest };
  },

  async read(id: GenreScheme['id']): Promise<GenreScheme | null> {
    const data = await genreService.read(id);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async update(
    id: GenreScheme['id'],
    dto: Partial<GenreDto>,
    authorization: string
  ): Promise<GenreScheme | null> {
    const { year, ...rest } = dto;
    const data = await genreService.update(
      id,
      year === undefined ? rest : { year: String(year), ...rest },
      authorization
    );
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async delete(
    id: GenreScheme['id'],
    token: string
  ): Promise<GenreScheme | null> {
    const data = await genreService.delete(id, token);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },
};

export { genreController as controller };
