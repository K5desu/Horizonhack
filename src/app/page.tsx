import prisma from '@/lib/prisma'
import Inner from '@/components/Inner'
import ArticleCard from '@/components/Article/ArticleCard'

export default async function HomePage() {
  const articles = await prisma.article.findMany({
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
  })
  return (
    <>
      <Inner>
        <header>
          <h1 className="text-3xl mt-6 font-bold text-gray-800 dark:text-white">Articles</h1>
        </header>
        <main className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} data={article} />
          ))}
        </main>
      </Inner>
    </>
  )
}
