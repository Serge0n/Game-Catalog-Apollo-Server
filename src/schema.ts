import { gql } from "apollo-server"

export const typeDefs = gql`

  type User {
    id: ID!
    email: String!
    password: String!
  }

  type Game {
    id: Int
    name: String
    release_dates: [ReleaseDate]
    first_release_date: Int
    genres: [Genre]
    age_ratings: [AgeRating]
    rating: Float
    total_rating: Float
    rating_count: Int
    url: String
    cover: Cover
    platforms: [Platform]
    game_engines: [GameEngine]
    game_modes: [GameMode]
  }

  type AgeRating {
    category: String
    rating: String
  }

  type GameEngine {
    name: String
  }

  type GameMode {
    name: String
  }

  type Cover {
    url: String
  }

  type Platform {
    id: Int
    abbreviation: String
  }

  type Genre {
    id: Int
    name: String
  }

  type ReleaseDate {
    date: String
    platform: String
  }

  type Query {
    game(id: Int): Game
    games(limit: Int, platformId: Int, sortField: String, sortDir: String): [Game]
  }
`
