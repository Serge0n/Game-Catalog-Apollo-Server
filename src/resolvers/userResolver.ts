import { hash, compare } from "bcryptjs"
import { Context } from "context"
import { sign } from "jsonwebtoken"
import { APP_SECRET } from "../utils/auth"

export const userResolver = {
  Query: {
    user: async (parent: any, args: any, context: Context) => {
      if (!context.userId) return null
      return context.prisma.user.findUnique({ where: { id: context.userId } })
    }
  },
  Mutation: {
    signUp: async (parent: any, args: any, context: Context) => {
      const { email, name } = args
      const password = await hash(args.password, 10)
      const user = await context.prisma.user.create({
        data: { email, name, password },
      })
      const token = sign({ userId: user.id }, APP_SECRET)

      return { token, user }
    },
    signIn: async (parent: any, args: any, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { email: args.email },
      })

      if (!user) { throw new Error("No such user found") }

      const valid = await compare(args.password, user.password)

      if (!valid) { throw new Error("Invalid password") }

      const token = sign({ userId: user.id }, APP_SECRET)
      return { token, user }
    }
  }
}