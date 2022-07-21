import type { WithPagination } from '../../common/type';
import type { Scheme as TrackScheme, Dto as TrackDto } from './type';
import { controller as trackController } from './controller';

const trackResolver = {
  Query: {
    async tracks(
      _unused: any,
      { limit, offset }: { limit?: number; offset?: number }
    ): Promise<WithPagination<TrackScheme>> {
      return trackController.readAll(limit, offset);
    },

    async track(
      _unused: any,
      { id }: { id: TrackScheme['id'] }
    ): Promise<TrackScheme | null> {
      return trackController.read(id);
    },
  },

  Mutation: {
    async createTrack(
      _unused: any,
      { dto }: { dto: TrackDto },
      { authorization }: { authorization: string }
    ): Promise<TrackScheme> {
      return trackController.create(dto, authorization);
    },

    async updateTrack(
      _unused: any,
      { id, dto }: { id: TrackScheme['id']; dto: Partial<TrackDto> },
      { authorization }: { authorization: string }
    ): Promise<TrackScheme | null> {
      return trackController.update(id, dto, authorization);
    },

    async deleteTrack(
      _unused: any,
      { id }: { id: TrackScheme['id'] },
      { authorization }: { authorization: string }
    ): Promise<TrackScheme | null> {
      return trackController.delete(id, authorization);
    },
  },
};

export { trackResolver as resolver };
