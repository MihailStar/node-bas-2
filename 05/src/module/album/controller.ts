import type {
  OutputType as AlbumOutputType,
  Scheme as AlbumScheme,
  Dto as AlbumDto,
} from './type';
import { controller as artistController } from '../artist/controller';
import { controller as bandController } from '../band/controller';
import { controller as trackController } from '../track/controller';
import { controller as genreController } from '../genre/controller';
import { notNull } from '../../common/utility';
import { service as albumService } from './service';
import type { WithPagination } from '../../common/type';

async function formResponseObject(
  data: AlbumOutputType | null
): Promise<AlbumScheme | null> {
  if (data === null) {
    return null;
  }

  const { _id: id, artistsIds, bandsIds, trackIds, genresIds, ...rest } = data;

  const [artists, bands, tracks, genres] = await Promise.all([
    Promise.all(
      artistsIds.map((artistiId) => artistController.read(artistiId))
    ),
    Promise.all(bandsIds.map((bandId) => bandController.read(bandId))),
    Promise.all(trackIds.map((trackId) => trackController.read(trackId))),
    Promise.all(genresIds.map((genreId) => genreController.read(genreId))),
  ]);

  return {
    id,
    artists: artists.filter(notNull),
    bands: bands.filter(notNull),
    tracks: tracks.filter(notNull),
    genres: genres.filter(notNull),
    ...rest,
  };
}

const albumController = {
  async create(dto: AlbumDto, authorization: string): Promise<AlbumScheme> {
    const { tracksIds: trackIds, ...rest } = dto;

    const album = await albumService.create(
      trackIds === undefined ? rest : { trackIds, ...rest },
      authorization
    );
    const responseObject = (await formResponseObject(album)) as AlbumScheme;

    return responseObject;
  },

  async readAll(
    limit?: number,
    offset?: number
  ): Promise<WithPagination<AlbumScheme>> {
    const { items: albums, ...rest } = await albumService.readAll(
      limit,
      offset
    );
    const responseObjects = (await Promise.all(
      albums.map(formResponseObject)
    )) as AlbumScheme[];

    return { items: responseObjects, ...rest };
  },

  async read(id: AlbumScheme['id']): Promise<AlbumScheme | null> {
    const data = await albumService.read(id);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async update(
    id: AlbumScheme['id'],
    dto: Partial<AlbumDto>,
    authorization: string
  ): Promise<AlbumScheme | null> {
    const { tracksIds: trackIds, ...rest } = dto;
    const data = await albumService.update(
      id,
      trackIds === undefined ? rest : { trackIds, ...rest },
      authorization
    );
    const responseObject = await formResponseObject(data);

    return responseObject;
  },

  async delete(
    id: AlbumScheme['id'],
    authorization: string
  ): Promise<AlbumScheme | null> {
    const data = await albumService.delete(id, authorization);
    const responseObject = await formResponseObject(data);

    return responseObject;
  },
};

export { albumController as controller };
