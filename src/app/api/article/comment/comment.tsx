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
          comments: {
            create: [{ articleId: articleId, body: comment }],
          },
        },
      })
    } catch (error) {
      return 'error'
    }
  }
}
