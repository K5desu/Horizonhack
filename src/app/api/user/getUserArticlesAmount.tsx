import prisma from '@/lib/prisma'

export default async function getUserArticlesAmount({
  username,
  isCurrentUser = false,
}: {
  username: string
  isCurrentUser?: boolean
}) {
  try {
    const articlesAmount = await prisma.article.count({
      where: {
        author: {
          name: username,
        },
        ...(!isCurrentUser && { visibility: true }),
      },
    })
    return articlesAmount
  } catch (error) {
    throw error
  }
}
