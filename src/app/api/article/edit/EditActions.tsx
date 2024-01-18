'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateArticle(
  prevState: {
    message: string
    id: string
  },
  formData: FormData
) {
  const rawFormData = {
    articleId: formData.get('articleId') as string,
    title: formData.get('title') as string,
    body: formData.get('body') as string,
    tags: formData.get('tags') as string,
    visibility: formData.get('radio_visibility') === 'public' ? true : false,
  }
  try {
    const tags = rawFormData.tags.split(',')
    const currentArticle = await prisma.article.findUnique({
      where: {
        id: rawFormData.articleId,
      },
      include: {
        tags: true,
      },
    })
    const disconnectTags = currentArticle?.tags.map((tag) => ({ name: tag.name }))
    const article = await prisma.article.update({
      where: {
        id: rawFormData.articleId,
      },
      data: {
        title: rawFormData.title as string,
        body: rawFormData.body as string,
        tags: {
          disconnect: disconnectTags,
          connectOrCreate: tags.map((tag) => {
            return {
              where: {
                name: tag,
              },
              create: {
                name: tag,
              },
            }
          }),
        },
        visibility: rawFormData.visibility as boolean,
      },
    })
    revalidatePath(`/articles/[id]/edit`, 'page')
    return { message: 'success', id: String(article.id) }
  } catch (error) {
    return { message: 'error', id: '' }
  }
}

export async function deleteArticle(
  prevState: {
    message: string
    id: string
  },
  formData: FormData
) {
  const rawFormData = {
    articleId: formData.get('articleId') as string,
  }
  try {
    const deletedComments = await prisma.comment.deleteMany({
      where: {
        articleId: rawFormData.articleId,
      },
    })
    const deletedArticle = await prisma.article.delete({
      where: {
        id: rawFormData.articleId,
      },
    })
    return { message: 'success', id: rawFormData.articleId }
  } catch (error) {
    return { message: 'error', id: '' }
  }
}
