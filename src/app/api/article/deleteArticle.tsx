'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const DeleteArticle = async (id: string) => {
  try {
    const deleteArticle = await prisma.article.delete({
      where: {
        id: id,
      },
    })
    return redirect('/')
  } catch (error) {
    return error
  }
}
