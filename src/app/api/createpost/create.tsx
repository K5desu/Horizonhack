'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import cuid from 'cuid'
export const PostWork = async (name: string) => {
  const session = await getServerSession()
  const email = session?.user.email
  const uniqueId = cuid()
  if (name == 'works') {
    if (email)
      try {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            work: {
              create: [{ id: uniqueId }],
            },
          },
        })
      } catch (error) {
        return 'error'
      }

    redirect(`/${uniqueId}/edit`)
  } else {
    if (email)
      try {
        await prisma.user.update({
          where: {
            email: email, //セッション情報からとってくる
          },
          data: {
            article: {
              create: [{ id: uniqueId }], //cuid
            },
          },
        })
      } catch (error) {
        return 'error'
      }

    redirect(`/${name}/${uniqueId}/edit`)
  }
}
