'use server'

import { prisma } from '@/lib/prisma'
export const notFound = async (id: string) => {
  try {
    await prisma.work.findFirstOrThrow({
      where: {
        id: id,
      },
    })
  } catch (errro) {
    return 'no'
  }
}
