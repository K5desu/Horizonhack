'use server'

import prisma from '@/lib/prisma'
import { del } from '@vercel/blob'
import { getServerSession } from 'next-auth'
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
    visibility: Boolean(formData.get('radio_visibility') === 'public' ? true : false),
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
  const session = await getServerSession()
  try {
    const work = await prisma.work.findUniqueOrThrow({
      where: {
        id: rawFormData.workId,
      },
      select: {
        img: true,
      },
    })
    if (work.img) {
      await del(work.img)
    }
    await prisma.work.delete({
      where: {
        id: rawFormData.workId,
      },
    })
    return { message: 'success', id: String(rawFormData.workId), username: session?.user.name }
  } catch (error) {
    return { message: 'error', id: '' }
  }
}
