import { ApolloServer } from "apollo-server"
import { GamesAPI } from "./services/games-api"
import { schema } from "./schema"
import { context } from "./context"

const server = new ApolloServer({
  schema,
  dataSources: () => ({ gamesAPI: new GamesAPI() }),
  context
})

server.listen({ port: 4000 }).then(({ url }) => console.log(`🚀  Server ready at ${url}`))
