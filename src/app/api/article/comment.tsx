'use server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
export const Answer = async (comment: string, articleId: string) => {
  const session = await getServerSession()
  const useremail = session?.user.email

  if (useremail) {
    try {
      await prisma.user.update({
        where: {
          email: useremail,
        },
        data: {
          comment: {
            create: [{ articleId: articleId, comments: comment }],
          },
        },
      })
    } catch (error) {
      return 'error'
    }
  }
}
