import prisma from '@/lib/prisma'

interface GetUserWorksParams {
  username: string
  isCurrentUser?: boolean
  page?: number
  sort?: 'new' | 'old'
}

export default async function getUserWorks({
  username,
  isCurrentUser = false,
  page = 1,
  sort = 'new',
}: GetUserWorksParams) {
  try {
    const pageSize = 10
    const skip = (page - 1) * pageSize

    const works = await prisma.work.findMany({
      where: {
        author: {
          name: username,
        },
        ...(!isCurrentUser && { visibility: true }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        img: true,
        created_at: true,
        visibility: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        created_at: sort === 'new' ? 'desc' : 'asc',
      },
      skip,
      take: pageSize,
    })

    return works
  } catch (error) {
    console.error('Error fetching user works:', error)
    throw error
  }
}
