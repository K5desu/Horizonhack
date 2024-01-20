import prisma from '@/lib/prisma'

export default async function getUserId(username: string) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        name: username,
      },
      select: {
        id: true,
      },
    })
    return user ? user.id : ''
  } catch (error) {
    return ''
  }
}
