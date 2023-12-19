'use server'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const All = async () => {
  try {
    const Allwork = await prisma.work.findMany({
      include: {
        author: true,
      },
    })
    return Allwork
  } catch (error) {
    return 'error'
  }
}
