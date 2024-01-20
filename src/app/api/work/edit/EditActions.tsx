'use server'

import prisma from '@/lib/prisma'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function updateWork(
  prevState: {
    message: string
    id: string
  },
  formData: FormData
) {
  const rawFormData = {
    workId: formData.get('workId') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    url: formData.get('url') as string,
    img: formData.get('img') as string,
    visibility: Boolean(formData.get('visibility')),
  }
  try {
    const work = await prisma.work.update({
      where: {
        id: rawFormData.workId,
      },
      data: {
        title: rawFormData.title as string,
        description: rawFormData.description as string,
        url: rawFormData.url as string,
        img: rawFormData.img as string,
        visibility: rawFormData.visibility as boolean,
      },
    })
    revalidatePath(`/works/[id]/edit`, 'page')
    return { message: 'success', id: String(rawFormData.workId) }
  } catch (error) {
    return { message: 'error', id: '' }
  }
}

export async function deleteWork(
  prevState: {
    message: string
    id: string
  },
  formData: FormData
) {
  const rawFormData = {
    workId: formData.get('workId') as string,
  }
  try {
    const work = await prisma.work.findUniqueOrThrow({
      where: {
        id: rawFormData.workId,
      },
      select: {
        img: true,
      },
    })
    await del(work.img ?? '')
    await prisma.work.delete({
      where: {
        id: rawFormData.workId,
      },
    })
    return { message: 'success', id: String(rawFormData.workId) }
  } catch (error) {
    return { message: 'error', id: '' }
  }
}
