'use server'

import { prisma } from '@/lib/prisma'
export const userIdn = async (username: string) => {
  try {
    const userId = await prisma.user.findFirstOrThrow({
      where: {
        name: username,
      },
      select: {
        id: true,
      },
    })
    return userId
  } catch (error) {
    return 'No user'
  }
}
