import { gql } from 'apollo-server';

const trackScheme = gql`
  type Track {
    id: ID!
    title: String!
    album: Album
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  type Tracks {
    items: [Track]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  input CreateTrackDto {
    title: String!
    albumId: ID
    artistsIds: [ID]
    bandsIds: [ID]
    duration: Int
    released: Int
    genresIds: [ID]
  }

  input UpdateTrackDto {
    title: String
    albumId: ID
    artistsIds: [ID]
    bandsIds: [ID]
    duration: Int
    released: Int
    genresIds: [ID]
  }

  type Query {
    tracks(limit: Int, offset: Int): Tracks
    track(id: ID!): Track
  }

  type Mutation {
    createTrack(dto: CreateTrackDto!): Track
    updateTrack(id: ID!, dto: UpdateTrackDto!): Track
    deleteTrack(id: ID!): Track
  }
`;

export { trackScheme as scheme };
