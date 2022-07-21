import { gql } from 'apollo-server';

const artistScheme = gql`
  type Artist {
    id: ID!
    firstName: String!
    secondName: String!
    middleName: String
    birthDate: String
    birthPlace: String
    country: String!
    bands: [Band]
    instruments: [String]
  }

  type Artists {
    items: [Artist]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  input CreateArtistDto {
    firstName: String!
    secondName: String!
    middleName: String
    birthDate: String
    birthPlace: String
    country: String!
    bandsIds: [ID]
    instruments: [String]
  }

  input UpdateArtistDto {
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bandsIds: [ID]
    instruments: [String]
  }

  type Query {
    artists(limit: Int, offset: Int): Artists
    artist(id: ID!): Artist
  }

  type Mutation {
    createArtist(dto: CreateArtistDto!): Artist
    updateArtist(id: ID!, dto: UpdateArtistDto!): Artist
    deleteArtist(id: ID!): Artist
  }
`;

export { artistScheme as scheme };
