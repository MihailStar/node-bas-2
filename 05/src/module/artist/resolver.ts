import type { WithPagination } from '../../common/type';
import type { Scheme as ArtistScheme, Dto as ArtistDto } from './type';
import { controller as artistController } from './controller';

const artistResolver = {
  Query: {
    async artists(
      _unused: any,
      { limit, offset }: { limit?: number; offset?: number }
    ): Promise<WithPagination<ArtistScheme>> {
      return artistController.readAll(limit, offset);
    },

    async artist(
      _unused: any,
      { id }: { id: ArtistScheme['id'] }
    ): Promise<ArtistScheme | null> {
      return artistController.read(id);
    },
  },

  Mutation: {
    async createArtist(
      _unused: any,
      { dto }: { dto: ArtistDto },
      { authorization }: { authorization: string }
    ): Promise<ArtistScheme> {
      return artistController.create(dto, authorization);
    },

    async updateArtist(
      _unused: any,
      { id, dto }: { id: ArtistScheme['id']; dto: Partial<ArtistDto> },
      { authorization }: { authorization: string }
    ): Promise<ArtistScheme | null> {
      return artistController.update(id, dto, authorization);
    },

    async deleteArtist(
      _unused: any,
      { id }: { id: ArtistScheme['id'] },
      { authorization }: { authorization: string }
    ): Promise<ArtistScheme | null> {
      return artistController.delete(id, authorization);
    },
  },
};

export { artistResolver as resolver };
