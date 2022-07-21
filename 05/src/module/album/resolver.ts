import type { WithPagination } from '../../common/type';
import type { Scheme as AlbumScheme, Dto as AlbumDto } from './type';
import { controller as albumController } from './controller';

const albumResolver = {
  Query: {
    async albums(
      _unused: any,
      { limit, offset }: { limit?: number; offset?: number }
    ): Promise<WithPagination<AlbumScheme>> {
      return albumController.readAll(limit, offset);
    },

    async album(
      _unused: any,
      { id }: { id: AlbumScheme['id'] }
    ): Promise<AlbumScheme | null> {
      return albumController.read(id);
    },
  },

  Mutation: {
    async createAlbum(
      _unused: any,
      { dto }: { dto: AlbumDto },
      { authorization }: { authorization: string }
    ): Promise<AlbumScheme> {
      return albumController.create(dto, authorization);
    },

    async updateAlbum(
      _unused: any,
      { id, dto }: { id: AlbumScheme['id']; dto: Partial<AlbumDto> },
      { authorization }: { authorization: string }
    ): Promise<AlbumScheme | null> {
      return albumController.update(id, dto, authorization);
    },

    async deleteAlbum(
      _unused: any,
      { id }: { id: AlbumScheme['id'] },
      { authorization }: { authorization: string }
    ): Promise<AlbumScheme | null> {
      return albumController.delete(id, authorization);
    },
  },
};

export { albumResolver as resolver };
