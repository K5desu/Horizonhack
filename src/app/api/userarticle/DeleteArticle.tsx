'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const DeleteArticle = async (articleId: any) => {
  const getArt = await prisma.article.findFirst({
    where: {
      id: articleId,
    },
  })
  const deleteArtic = await prisma.article.delete({
    where: {
      id: articleId,
    },
  })
  return redirect('/')
}
