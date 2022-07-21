import type {
  OutputType as TrackOutputType,
  Scheme as TrackScheme,
  Dto as TrackDto,
} from './type';
import { controller as albumController } from '../album/controller';
import { controller as artistController } from '../artist/controller';
import { controller as bandController } from '../band/controller';
import { controller as genreController } from '../genre/controller';
import { notNull } from '../../common/utility';
import { service as trackService } from './service';
import type { WithPagination } from '../../common/type';

async function formResponseObject(
  data: TrackOutputType | null
): Promise<TrackScheme | null> {
  if (data === null) {
    return null;
  }

  const { _id: id, albumId, artistsIds, bandsIds, genresIds, ...rest } = data;

  const album =
    albumId === undefined
      ? undefined
      : (await albumController.read(albumId)) ?? undefined;
  const [artists, bands, genres] = await Promise.all([
    Promise.all(
      artistsIds.map((artistiId) => artistController.read(artistiId))
    ),
    Promise.all(bandsIds.map((bandId) => bandController.read(bandId))),
    Promise.all(genresIds.map((genreId) => genreController.read(genreId))),
  ]);
  const responseObjectWithoutAlbum = {
    id,
    artists: artists.filter(notNull),
    bands: bands.filter(notNull),
    genres: genres.filter(notNull),
    ...rest,
  };

  return album === undefined
    ? responseObjectWithoutAlbum
    : { album, ...responseObjectWithoutAlbum };
}

const trackController = {
  async create(dto: TrackDto, authorization: string): Promise<TrackScheme> {
    const track = await trackService.create(dto, authorization);
    const responseObject = (await formResponseObject(track)) as TrackScheme;

    return responseObject;
  },

  async readAll(
    limit?: number,
    offset?: number
  ): Promise<WithPagination<TrackScheme>> {
    const { items: tracks, ...rest } = await trackService.readAll(
      limit,
      offset
    );
    const responseObjects = (await Promise.all(
      tracks.map(formResponseObject)
    )) as TrackScheme[];

    return { items: responseObjects, ...rest };
  },

  async read(id: TrackScheme['id']): Promise<TrackScheme | null> {
    const data = await trackService.read(id);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async update(
    id: TrackScheme['id'],
    dto: Partial<TrackDto>,
    authorization: string
  ): Promise<TrackScheme | null> {
    const data = await trackService.update(id, dto, authorization);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async delete(
    id: TrackScheme['id'],
    authorization: string
  ): Promise<TrackScheme | null> {
    const data = await trackService.delete(id, authorization);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },
};

export { trackController as controller };
