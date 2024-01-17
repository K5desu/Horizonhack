'use server'

import { revalidatePath } from 'next/cache'
import getUserId from '../user/getUserId'
import prisma from '@/lib/prisma'

export async function createComment(
  prevState: {
    message: string
    id: string
  },
  formData: FormData
) {
  const rawFormData = {
    articleId: formData.get('articleId') as string,
    articleAuthor: formData.get('articleAuthor') as string,
    authorName: formData.get('authorName') as string,
    body: formData.get('body') as string,
  }
  try {
    const authorId = await getUserId(rawFormData.authorName)
    const comment = await prisma.comment.create({
      data: {
        body: rawFormData.body as string,
        author: {
          connect: {
            id: authorId,
          },
        },
        article: {
          connect: {
            id: rawFormData.articleId as string,
          },
        },
      },
    })
    revalidatePath(`/[username]/articles/[articleId]`, 'page')
    return { message: 'success', id: String(comment.id) }
  } catch (error) {
    return { message: 'error', id: '' }
  }
}

export async function deleteComment(
  prevState: {
    message: string
    id: string
  },
  formData: FormData
) {
  const rawFormData = {
    commentId: formData.get('commentId') as string,
    authorName: formData.get('authorName') as string,
  }
  try {
    const authorId = await getUserId(rawFormData.authorName)
    const comment = await prisma.comment.delete({
      where: {
        id: Number(rawFormData.commentId),
      },
    })
    revalidatePath(`/[username]/articles/[articleId]`, 'page')
    return { message: 'success', id: rawFormData.commentId }
  } catch (error) {
    return { message: 'error', id: '' }
  }
}
