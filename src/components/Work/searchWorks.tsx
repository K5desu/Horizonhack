import prisma from '@/lib/prisma'
import WorkCard from './Card'

export default async function SearchWorks({
  searchParams,
}: {
  searchParams?: {
    q?: string | undefined
    page?: string | undefined
    sort?: 'new' | 'old' | undefined
  }
}) {
  const works = await prisma.work.findMany({
    where: {
      title: {
        contains: searchParams?.q,
      },
      visibility: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      url: true,
      img: true,
      created_at: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      created_at: searchParams?.sort === 'new' ? 'desc' : 'asc',
    },
    take: 10,
    skip: Number(searchParams?.page || 0) * 10,
  })

  return (
    <>
      {works.map((work) => (
        <div className="group relative" key={work.id}>
          <WorkCard data={work} />
        </div>
      ))}
      {works.length === 0 && <p className="text-gray-500 dark:text-gray-400">検索結果 0件</p>}
    </>
  )
}
