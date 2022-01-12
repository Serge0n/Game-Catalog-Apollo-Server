import { join } from "path"
import { readdirSync, readFileSync } from "fs"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { resolvers } from "./resolvers"

const gqlFiles = readdirSync(join(__dirname, "./typeDefs"))

let typeDefs = ""

gqlFiles.forEach(file => {
  typeDefs += readFileSync(join(__dirname, "./typedefs", file), { encoding: "utf8" })
})

export const schema = makeExecutableSchema({ typeDefs, resolvers })