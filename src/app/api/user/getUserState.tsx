import prisma from '@/lib/prisma'

export default async function getUsersState(username: string, isCurrentUser?: boolean) {
  const articleWhere = {
    author: {
      name: username,
    },
    ...(!isCurrentUser && { visibility: true }),
  }

  const otherWhere = {
    author: {
      name: username,
    },
  }

  const ArticleAmount = await prisma.article.count({ where: articleWhere })
  const WorkAmount = await prisma.work.count({ where: otherWhere })
  const CommentAmount = await prisma.comment.count({ where: otherWhere })

  return { ArticleAmount, WorkAmount, CommentAmount }
}
