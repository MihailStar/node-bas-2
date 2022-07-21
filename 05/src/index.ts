import { ApolloServer, ForbiddenError } from 'apollo-server';
import { EOL } from 'os';
import { configuration } from './common/configuration';
import { scheme as albumScheme } from './module/album/scheme';
import { scheme as artistScheme } from './module/artist/scheme';
import { scheme as bandScheme } from './module/band/scheme';
import { scheme as genreScheme } from './module/genre/scheme';
import { scheme as trackScheme } from './module/track/scheme';
import { resolver as albumResolver } from './module/album/resolver';
import { resolver as artistResolver } from './module/artist/resolver';
import { resolver as bandResolver } from './module/band/resolver';
import { resolver as genreResolver } from './module/genre/resolver';
import { resolver as trackResolver } from './module/track/resolver';

const { SERVER_PORT } = configuration;

new ApolloServer({
  typeDefs: [
      albumScheme,
      artistScheme,
      bandScheme,
      genreScheme,
      trackScheme
    ],

  resolvers: [
    albumResolver,
    artistResolver,
    bandResolver,
    genreResolver,
    trackResolver,
  ],

  /**
   * @throws {ForbiddenError}
   */
  context: ({ req }): { authorization: string } => {
    const {
      headers: { authorization },
    } = req;

    if (authorization === undefined) {
      throw new ForbiddenError('Not token');
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new ForbiddenError('Bad token');
    }

    return { authorization };
  },

  cache: 'bounded'
})
  .listen({
    port: SERVER_PORT,
  })
  .then((serverInformation) => {
    process.stdout.write(`🚀 ${serverInformation.url}${EOL}`);
  })
  .catch((reason) => {
    throw reason instanceof Error ? reason : new Error(String(reason));
  });
