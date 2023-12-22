import prisma from '@/lib/prisma'
import Inner from '@/components/Inner'
import ArticleCard from '@/components/Article/ArticleCard'

export default async function HomePage() {
  const articles = await prisma.article.findMany({
    where: {
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
      created_at: 'desc',
    },
    take: -10,
  })
  return (
    <>
      <Inner>
        <header>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-50">Articles</h2>
        </header>
        <h3 className="text-xl mt-4 font-bold text-gray-800 dark:text-gray-50">最新</h3>
        <main className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} data={article} />
          ))}
          {articles.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              まだ、記事がありません 最初の投稿者になりませんか？
            </p>
          )}
        </main>
      </Inner>
    </>
  )
}
