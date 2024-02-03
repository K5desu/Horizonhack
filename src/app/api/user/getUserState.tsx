import prisma from '@/lib/prisma'

export default async function getUsersState(username: string, isCurrentUser?: boolean) {
  const publicWhere = {
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

  const ArticleAmount = await prisma.article.count({ where: publicWhere })
  const WorkAmount = await prisma.work.count({ where: publicWhere })
  const CommentAmount = await prisma.comment.count({ where: otherWhere })
  const user = await prisma.user.findFirst({ where: { name: username }, select: { id: true } })
  const TagAmount = await prisma.tagsOnUsers.count({ where: { userId: user?.id } })

  return { ArticleAmount, WorkAmount, CommentAmount, TagAmount }
}
