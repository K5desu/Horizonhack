'use server'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const All = async () => {
  try {
    //usernameはセッション情報から
    const Allarticle = await prisma.article.findMany()
    return Allarticle
  } catch (error) {
    return 'No works'
  }
}
