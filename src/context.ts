import { PrismaClient } from "@prisma/client"
import { decodeAuthHeader } from "./utils/auth"
import { Request } from "express" 

const CLIEND_ID = "4u0rgxcllhiexenr0wkhyxe5eo5cs6"
const CLIENT_TOKEN = "Bearer rz4mgzol067y8u3dh7o1px98x2k3qv"

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  userId?: number
  clientId: string
  token: string
}

export const context = ({ req }: { req: Request }): Context => {
  const token =
      req && req.headers.authorization
          ? decodeAuthHeader(req.headers.authorization)
          : null;

  return {  
      prisma,
      userId: token?.userId,
      clientId: CLIEND_ID,
      token: CLIENT_TOKEN,
  }
}