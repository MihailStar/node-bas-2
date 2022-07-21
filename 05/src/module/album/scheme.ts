import { gql } from 'apollo-server';

const albumScheme = gql`
  type Album {
    id: ID!
    name: String!
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
  }

  type Albums {
    items: [Album]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  input CreateAlbumDto {
    name: String!
    released: Int
    artistsIds: [ID]
    bandsIds: [ID]
    tracksIds: [ID]
    genresIds: [ID]
    image: String
  }

  input UpdateAlbumDto {
    name: String
    released: Int
    artistsIds: [ID]
    bandsIds: [ID]
    tracksIds: [ID]
    genresIds: [ID]
    image: String
  }

  type Query {
    albums(limit: Int, offset: Int): Albums
    album(id: ID!): Album
  }

  type Mutation {
    createAlbum(dto: CreateAlbumDto!): Album
    updateAlbum(id: ID!, dto: UpdateAlbumDto!): Album
    deleteAlbum(id: ID!): Album
  }
`;

export { albumScheme as scheme };
