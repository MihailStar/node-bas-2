import { gql } from 'apollo-server';

const genreScheme = gql`
  type Genre {
    id: ID!
    name: String!
    description: String
    country: String
    year: Int
  }

  type Genres {
    items: [Genre]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  input CreateGenreDto {
    name: String!
    description: String
    country: String
    year: Int
  }

  input UpdateGenreDto {
    name: String
    description: String
    country: String
    year: Int
  }

  type Query {
    genres(limit: Int, offset: Int): Genres
    genre(id: ID!): Genre
  }

  type Mutation {
    createGenre(dto: CreateGenreDto!): Genre
    updateGenre(id: ID!, dto: UpdateGenreDto!): Genre
    deleteGenre(id: ID!): Genre
  }
`;

export { genreScheme as scheme };
