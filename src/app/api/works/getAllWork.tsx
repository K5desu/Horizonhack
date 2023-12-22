'use server'

import { prisma } from '@/lib/prisma'
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
