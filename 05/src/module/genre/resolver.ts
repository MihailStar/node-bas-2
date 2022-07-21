import type { WithPagination } from '../../common/type';
import type { Scheme as GenreScheme, Dto as GenreDto } from './type';
import { controller as genreController } from './controller';

const genreResolver = {
  Query: {
    async genres(
      _unused: any,
      { limit, offset }: { limit?: number; offset?: number }
    ): Promise<WithPagination<GenreScheme>> {
      return genreController.readAll(limit, offset);
    },

    async genre(
      _unused: any,
      { id }: { id: GenreScheme['id'] }
    ): Promise<GenreScheme | null> {
      return genreController.read(id);
    },
  },

  Mutation: {
    async createGenre(
      _unused: any,
      { dto }: { dto: GenreDto },
      { authorization }: { authorization: string }
    ): Promise<GenreScheme> {
      return genreController.create(dto, authorization);
    },

    async updateGenre(
      _unused: any,
      { id, dto }: { id: GenreScheme['id']; dto: Partial<GenreDto> },
      { authorization }: { authorization: string }
    ): Promise<GenreScheme | null> {
      return genreController.update(id, dto, authorization);
    },

    async deleteGenre(
      _unused: any,
      { id }: { id: GenreScheme['id'] },
      { authorization }: { authorization: string }
    ): Promise<GenreScheme | null> {
      return genreController.delete(id, authorization);
    },
  },
};

export { genreResolver as resolver };
