import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function SearchTags({
  searchParams,
}: {
  searchParams?: {
    q?: string | undefined
    page?: string | undefined
    sort?: 'new' | 'old' | undefined
  }
}) {
  const skip = (Number(searchParams?.page) - 1) * 10 || 0
  const orderBy = searchParams?.sort || 'new'
  const tags = await prisma.tag.findMany({
    where: {
      name: {
        contains: searchParams?.q,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: orderBy === 'new' ? 'desc' : 'asc',
    },
    skip,
    take: 10,
  })

  const tagsWithCounts = await Promise.all(
    tags.map(async (tag) => {
      const tagOnArticle = await prisma.article.count({
        where: {
          tags: {
            some: {
              name: {
                contains: tag.name,
              },
            },
          },
        },
      })
      const tagOnUser = await prisma.tagsOnUsers.count({
        where: {
          tagId: tag.id,
        },
      })

      return {
        ...tag,
        tagOnArticle,
        tagOnUser,
      }
    })
  )

  return (
    <>
      {tagsWithCounts.map((tag) => (
        <Link href={`/tags/${tag.name}`} key={tag.id} className="group">
          <div
            className={`flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900`}
          >
            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <p className="text-2xl font-bold text-gray-500">#</p>
              </div>
              <div>
                <p className="text-lg font-bold group-hover:underline">{tag.name}</p>
                <p className="text-sm text-gray-500">
                  Use in {tag.tagOnArticle} articles, {tag.tagOnUser} users
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}
