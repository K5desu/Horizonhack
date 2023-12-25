import prisma from '@/lib/prisma'

export default async function getUserArticles(username: string, isCurrentUser?: boolean) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        author: {
          name: username,
        },
        ...(!isCurrentUser && { visibility: true }),
      },
      select: {
        id: true,
        title: true,
        created_at: true,
        visibility: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
    })
    return articles
  } catch (error) {
    return []
  }
}
