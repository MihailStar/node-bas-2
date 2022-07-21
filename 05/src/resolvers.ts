import { resolver as albumResolver } from './module/album/resolver';
import { resolver as artistResolver } from './module/artist/resolver';
import { resolver as bandResolver } from './module/band/resolver';
import { resolver as genreResolver } from './module/genre/resolver';
import { resolver as trackResolver } from './module/track/resolver';

const resolvers = {
  Query: {
    ...albumResolver.Query,
    ...artistResolver.Query,
    ...bandResolver.Query,
    ...genreResolver.Query,
    ...trackResolver.Query,
  },

  Mutation: {
    ...albumResolver.Mutation,
    ...artistResolver.Mutation,
    ...bandResolver.Mutation,
    ...genreResolver.Mutation,
    ...trackResolver.Mutation,
  },
};

export { resolvers };
