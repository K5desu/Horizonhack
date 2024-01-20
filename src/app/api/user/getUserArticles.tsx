import prisma from '@/lib/prisma'

interface GetUserArticlesParams {
  username: string
  isCurrentUser?: boolean
  page?: number
  sort?: 'new' | 'old'
}

export default async function getUserArticles({
  username,
  isCurrentUser = false,
  page = 1,
  sort = 'new',
}: GetUserArticlesParams) {
  try {
    const pageSize = 10
    const skip = (page - 1) * pageSize

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
        created_at: sort === 'new' ? 'desc' : 'asc',
      },
      skip,
      take: pageSize,
    })

    return articles
  } catch (error) {
    console.error('Error fetching user articles:', error)
    throw error
  }
}
