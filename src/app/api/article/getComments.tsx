import prisma from '@/lib/prisma'

export default async function getComments(articleId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId,
      },
      select: {
        id: true,
        body: true,
        created_at: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })
    return comments
  } catch (error) {
    throw null
  }
}
