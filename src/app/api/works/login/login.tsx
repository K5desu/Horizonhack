'use server'

import { prisma } from '@/lib/prisma'
export const postWork = async (id: string) => {
  try {
    await prisma.user.update({
      where: {
        id: id, //セッション情報からとってくる
      },
      data: {
        work: {
          create: [{ id: id }],
        },
      },
    })
  } catch (error) {
    return 'error'
  }
}
