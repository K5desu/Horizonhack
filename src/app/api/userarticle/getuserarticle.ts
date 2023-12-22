'use server'

import { prisma } from '@/lib/prisma'
export const Alla = async (id: string) => {
  try {
    const Allwork = await prisma.article.findMany({
      where: {
        authorId: id,
        NOT: [
          {
            body: null,
          },
        ],
      },
    })
    return Allwork
  } catch (error) {
    return 'No works'
  }
}
