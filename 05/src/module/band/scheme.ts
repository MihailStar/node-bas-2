import { gql } from 'apollo-server';

const bandScheme = gql`
  type Member {
    artist: String!
    instrument: String
    years: [String]
  }

  type Band {
    id: ID!
    name: String!
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type Bands {
    items: [Band]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  input MemberDto {
    artist: String!
    instrument: String
    years: [String]
  }

  input CreateBandDto {
    name: String!
    origin: String
    members: [MemberDto]
    website: String
    genresIds: [ID]
  }

  input UpdateBandDto {
    name: String
    origin: String
    members: [MemberDto]
    website: String
    genresIds: [ID]
  }

  type Query {
    bands(limit: Int, offset: Int): Bands
    band(id: ID!): Band
  }

  type Mutation {
    createBand(dto: CreateBandDto!): Band
    updateBand(id: ID!, dto: UpdateBandDto!): Band
    deleteBand(id: ID!): Band
  }
`;

export { bandScheme as scheme };
