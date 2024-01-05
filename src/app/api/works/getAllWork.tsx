'use server'

import { prisma } from '@/lib/prisma'
export const All = async () => {
  try {
    const Allwork = await prisma.work.findMany({
      select: {
        id: true,
        title: true,
        url: true,
        img: true,
        created_at: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })
    return Allwork
  } catch (error) {
    return 'error'
  }
}
