import { gameResolver } from "./gameResolver"

export const resolvers = {
  Query: {
    ...gameResolver
  },
}