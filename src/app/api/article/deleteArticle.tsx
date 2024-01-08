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
  } catch (error) {
    console.log(error)
    return error
  }
  redirect('/')
}
