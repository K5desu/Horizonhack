import prisma from '@/lib/prisma'

export default async function getArticle(articleId: string) {
  try {
    const article = await prisma.article.findUniqueOrThrow({
      where: {
        id: articleId,
      },
      select: {
        id: true,
        title: true,
        body: true,
        created_at: true,
        updated_at: true,
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
    })
    return article
  } catch (error) {
    return null
  }
}
