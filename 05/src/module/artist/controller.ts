import type {
  OutputType as ArtistOutputType,
  Scheme as ArtistScheme,
  Dto as ArtistDto,
} from './type';
import { controller as bandController } from '../band/controller';
import { notNull } from '../../common/utility';

import { service as artistService } from './service';
import type { WithPagination } from '../../common/type';

async function formResponseObject(
  data: ArtistOutputType | null
): Promise<ArtistScheme | null> {
  if (data === null) {
    return null;
  }

  const { _id: id, bandsIds, ...rest } = data;

  const bands = await Promise.all(
    bandsIds.map((bandId) => bandController.read(bandId))
  );

  return {
    id,
    bands: bands.filter(notNull),
    ...rest,
  };
}

const artistController = {
  async create(dto: ArtistDto, authorization: string): Promise<ArtistScheme> {
    const artist = await artistService.create(dto, authorization);
    const responseObject = (await formResponseObject(artist)) as ArtistScheme;

    return responseObject;
  },

  async readAll(
    limit?: number,
    offset?: number
  ): Promise<WithPagination<ArtistScheme>> {
    const { items: artists, ...rest } = await artistService.readAll(
      limit,
      offset
    );
    const responseObjects = (await Promise.all(
      artists.map(formResponseObject)
    )) as ArtistScheme[];

    return { items: responseObjects, ...rest };
  },

  async read(id: ArtistScheme['id']): Promise<ArtistScheme | null> {
    const data = await artistService.read(id);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async update(
    id: ArtistScheme['id'],
    dto: Partial<ArtistDto>,
    authorization: string
  ): Promise<ArtistScheme | null> {
    const data = await artistService.update(id, dto, authorization);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async delete(
    id: ArtistScheme['id'],
    authorization: string
  ): Promise<ArtistScheme | null> {
    const data = await artistService.delete(id, authorization);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },
};

export { artistController as controller };
