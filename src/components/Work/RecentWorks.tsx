import prisma from '@/lib/prisma'
import WorkCard from '@/components/Work/Card'

export default async function RecentWorks() {
  const works = await prisma.work.findMany({
    where: {
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
      created_at: 'desc',
    },
    take: 10,
  })

  return (
    <>
      {works.map((work) => (
        <div className="group relative" key={work.id}>
          <WorkCard data={work} />
        </div>
      ))}
      {works.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          まだ、作品がありません 最初の投稿者になりませんか？
        </p>
      )}
    </>
  )
}
