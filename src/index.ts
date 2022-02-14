import { ApolloServer } from "apollo-server"
import { GamesAPI } from "./services/games-api"
import { schema } from "./schema"
import { getUserByToken } from "./models/User"

const CLIEND_ID = "4u0rgxcllhiexenr0wkhyxe5eo5cs6"
const CLIENT_TOKEN = "Bearer vk93mto6wl5cdsk8bbhwmwrnucwwxk"

const server = new ApolloServer({
  schema,
  dataSources: () => ({ gamesAPI: new GamesAPI() }),
  context: ({ req }) => {
    const token = req.headers.authorization || ""
    const user = getUserByToken(token)

    return { user, clientId: CLIEND_ID, token: CLIENT_TOKEN };
  },
})

const port = 4000
server.listen({ port }).then(({ url }) => console.log(`🚀  Server ready at ${url}`))
