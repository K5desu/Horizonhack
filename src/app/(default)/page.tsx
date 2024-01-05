import { Suspense } from 'react'
import Inner from '@/components/Inner'
import RecentArticles from '@/components/Article/RecentArticles'
import { ArticleCardSkeletons } from '@/components/Skeleton/skeletons'

export default async function HomePage() {
  return (
    <>
      <Inner>
        <header>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-50">Articles</h2>
        </header>
        <h3 className="text-xl mt-4 font-bold text-gray-800 dark:text-gray-50">最新</h3>
        <main className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Suspense fallback={<ArticleCardSkeletons />}>
            <RecentArticles />
          </Suspense>
        </main>
      </Inner>
    </>
  )
}
