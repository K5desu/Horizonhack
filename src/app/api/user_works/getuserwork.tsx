'use server'

import { prisma } from '@/lib/prisma'
export const Allw = async (id: string) => {
  try {
    const Allwork = await prisma.work.findMany({
      where: {
        authorId: id,
        NOT: [
          {
            url: null,
          },
        ],
      },
    })
    return Allwork
  } catch (error) {
    return 'No works'
  }
}
