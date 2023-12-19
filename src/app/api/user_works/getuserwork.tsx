'use server'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const All = async (username: string) => {
  try {
    const Allwork = await prisma.user.findFirstOrThrow({
      where: {
        name: username,
      },
      include: {
        work: true,
      },
    })
    return Allwork
  } catch (error) {
    return 'No works'
  }
}
