import type { WithPagination } from '../../common/type';
import type { Scheme as BandScheme, Dto as BandDto } from './type';
import { controller as bandController } from './controller';

const bandResolver = {
  Query: {
    async bands(
      _unused: any,
      { limit, offset }: { limit?: number; offset?: number }
    ): Promise<WithPagination<BandScheme>> {
      return bandController.readAll(limit, offset);
    },

    async band(
      _unused: any,
      { id }: { id: BandScheme['id'] }
    ): Promise<BandScheme | null> {
      return bandController.read(id);
    },
  },

  Mutation: {
    async createBand(
      _unused: any,
      { dto }: { dto: BandDto },
      { authorization }: { authorization: string }
    ): Promise<BandScheme> {
      return bandController.create(dto, authorization);
    },

    async updateBand(
      _unused: any,
      { id, dto }: { id: BandScheme['id']; dto: Partial<BandDto> },
      { authorization }: { authorization: string }
    ): Promise<BandScheme | null> {
      return bandController.update(id, dto, authorization);
    },

    async deleteBand(
      _unused: any,
      { id }: { id: BandScheme['id'] },
      { authorization }: { authorization: string }
    ): Promise<BandScheme | null> {
      return bandController.delete(id, authorization);
    },
  },
};

export { bandResolver as resolver };
