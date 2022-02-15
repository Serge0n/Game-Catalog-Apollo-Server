import * as bcrypt from "bcryptjs"
import { Context } from "context"
import * as jwt from "jsonwebtoken"
import { APP_SECRET } from "../utils/auth"

export const userResolver = {
  Query: {
    user: async (parent: any, args: any, context: Context) => {
      if (!context.userId) return null
      return context.prisma.user.findUnique({ where: { id: context.userId } })
    }
  },
  Mutation: {
    signup: async (parent: any, args: any, context: any) => {
      const { email, name } = args;
      const password = await bcrypt.hash(args.password, 10)
      const user = await context.prisma.user.create({
        data: { email, name, password },
    });
      const token = jwt.sign({ userId: user.id }, APP_SECRET)
      
      return { token, user }
    }
  }
}