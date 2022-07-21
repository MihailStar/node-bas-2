import type {
  OutputType as BandOutputType,
  Scheme as BandScheme,
  Dto as BandDto,
} from './type';
import { controller as genreController } from '../genre/controller';
import { notNull } from '../../common/utility';
import { service as bandService } from './service';
import type { WithPagination } from '../../common/type';

async function formResponseObject(
  data: BandOutputType | null
): Promise<BandScheme | null> {
  if (data === null) {
    return null;
  }

  const { _id: id, genresIds, ...rest } = data;

  const genres = await Promise.all(
    genresIds.map((genreId) => genreController.read(genreId))
  );

  return {
    id,
    genres: genres.filter(notNull),
    ...rest,
  };
}

const bandController = {
  async create(dto: BandDto, authorization: string): Promise<BandScheme> {
    const band = await bandService.create(dto, authorization);
    const responseObject = (await formResponseObject(band)) as BandScheme;

    return responseObject;
  },

  async readAll(
    limit?: number,
    offset?: number
  ): Promise<WithPagination<BandScheme>> {
    const { items: bands, ...rest } = await bandService.readAll(limit, offset);
    const responseObjects = (await Promise.all(
      bands.map(formResponseObject)
    )) as BandScheme[];

    return { items: responseObjects, ...rest };
  },

  async read(id: BandScheme['id']): Promise<BandScheme | null> {
    const data = await bandService.read(id);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async update(
    id: BandScheme['id'],
    dto: Partial<BandDto>,
    authorization: string
  ): Promise<BandScheme | null> {
    const data = await bandService.update(id, dto, authorization);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async delete(
    id: BandScheme['id'],
    authorization: string
  ): Promise<BandScheme | null> {
    const data = await bandService.delete(id, authorization);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },
};

export { bandController as controller };
