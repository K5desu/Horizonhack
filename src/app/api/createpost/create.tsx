'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import cuid from 'cuid'

async function countDraft(username: string | null | undefined) {
  return await prisma.article.count({
    where: {
      author: {
        name: username,
      },
      visibility: false,
    },
  })
}

export const Post = async (name: string) => {
  const session = await getServerSession()
  const DraftsAmount = await countDraft(session?.user.name)

  const email = session?.user.email
  const uniqueId = cuid()

  if (DraftsAmount > 9) {
    return redirect(`/${session?.user.name}`)
  }
  if (name == 'works') {
    if (email)
      try {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            works: {
              create: [{ id: uniqueId }],
            },
          },
        })
      } catch (error) {
        return 'error'
      }

    redirect(`/works/${uniqueId}/edit`)
  } else {
    if (email)
      try {
        await prisma.user.update({
          where: {
            email: email, //セッション情報からとってくる
          },
          data: {
            articles: {
              create: [{ id: uniqueId }], //cuid
            },
          },
        })
      } catch (error) {
        return 'error'
      }

    redirect(`/articles/${uniqueId}/edit`)
  }
}
