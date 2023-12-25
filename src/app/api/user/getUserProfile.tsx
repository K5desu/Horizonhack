import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function getUserProfile(username: string) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        name: username,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    })
    return user
  } catch (error) {
    return notFound()
  }
}
