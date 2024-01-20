'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import cuid from 'cuid'

async function countDraft(username: string | null | undefined, type: string) {
  if (type === 'articles') {
    return await prisma.article.count({
      where: {
        author: {
          name: username,
        },
        visibility: false,
      },
    })
  }
  return await prisma.work.count({
    where: {
      author: {
        name: username,
      },
      visibility: false,
    },
  })
}

export async function createPost(
  prevState: {
    message: string
    id: string
  },
  formData: FormData
) {
  const type = formData.get('type') as string
  if (type !== 'articles' && type !== 'works')
    return { message: 'error', type: type, id: '', user: '' }

  const session = await getServerSession()
  const username = session?.user.name
  const email = session?.user.email
  if (!email) return { message: 'error', type: type, id: '', user: '' }

  const DraftsAmount = await countDraft(username, type)
  if (DraftsAmount > 9) return { message: 'overflow', type: type, id: '', user: username || '' }

  const uniqueId = cuid()

  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        [type]: {
          create: [{ id: uniqueId }],
        },
      },
    })
    return {
      message: 'success',
      type: type,
      id: String(uniqueId),
      user: username || '',
    }
  } catch (error) {
    return { message: 'error', type: type, id: '', user: '' }
  }
}
