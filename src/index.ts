import { ApolloServer } from "apollo-server"
import { GamesAPI } from "./games-api"
import { typeDefs } from "./schema"

const CLIEND_ID = "4u0rgxcllhiexenr0wkhyxe5eo5cs6"
const CLIENT_TOKEN = "Bearer vk93mto6wl5cdsk8bbhwmwrnucwwxk"

const resolvers = {
  Query: {
    game: async (_source: any, { id }: any, { dataSources }: any) => {
      const [game] = await dataSources.gamesAPI.getGame(id)

      return game
    },
    games: async (_source: any, { limit, platformId, sortField, sortDir }: any, { dataSources }: any) => {
      const games = await dataSources.gamesAPI.getGames(limit, platformId, sortField, sortDir)

      return games
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ gamesAPI: new GamesAPI() }),
  context: { clientId: CLIEND_ID, token: CLIENT_TOKEN }
})

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`))


