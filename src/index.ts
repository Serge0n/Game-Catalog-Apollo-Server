import { ApolloServer } from "apollo-server"
import { GamesAPI } from "./services/games-api"
import { schema } from "./schema"

const CLIEND_ID = "4u0rgxcllhiexenr0wkhyxe5eo5cs6"
const CLIENT_TOKEN = "Bearer vk93mto6wl5cdsk8bbhwmwrnucwwxk"

const server = new ApolloServer({
  schema,
  dataSources: () => ({ gamesAPI: new GamesAPI() }),
  context: { clientId: CLIEND_ID, token: CLIENT_TOKEN }
})

const port = 4000
server.listen({ port }).then(({ url }) => console.log(`🚀  Server ready at ${url}`))
