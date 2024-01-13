import prisma from '@/lib/prisma'
import ArticleCard from '../Article/Card'

export default async function SearchArticles({
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
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchParams?.q,
          },
        },
        {
          tags: {
            some: {
              name: {
                contains: searchParams?.q,
              },
            },
          },
        },
        {
          author: {
            name: {
              contains: searchParams?.q,
            },
          },
        },
      ],
      visibility: true,
    },
    select: {
      id: true,
      title: true,
      created_at: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      created_at: orderBy === 'new' ? 'desc' : 'asc',
    },
    take: 10,
    skip: skip,
  })

  return (
    <>
      {articles.map((article) => (
        <ArticleCard key={article.id} data={article} />
      ))}
      {articles.length === 0 && <p className="text-gray-500 dark:text-gray-400">検索結果 0件</p>}
    </>
  )
}
