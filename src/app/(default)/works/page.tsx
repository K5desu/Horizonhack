import { Suspense } from 'react'
import prisma from '@/lib/prisma'
import Inner from '@/components/Inner'
import { WorkCardSkeletons } from '@/components/Skeleton/skeletons'
import RecentWorks from '@/components/Work/RecentWorks'

export default async function AllFilesPage() {
  const worksAmount = await prisma.work.count({ where: { visibility: true } })

  return (
    <>
      <Inner>
        <header>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-50">Works</h2>
        </header>
        <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-50">最新</h3>
        <main className="my-3 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Suspense fallback={<WorkCardSkeletons amount={worksAmount > 10 ? 10 : worksAmount} />}>
            <RecentWorks />
          </Suspense>
        </main>
      </Inner>
    </>
  )
}
