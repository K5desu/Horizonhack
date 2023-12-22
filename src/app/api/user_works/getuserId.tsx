'use server'

import { prisma } from '@/lib/prisma'
export const userId = async (useremail: string) => {
  try {
    const userId = await prisma.user.findFirstOrThrow({
      where: {
        email: useremail,
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
