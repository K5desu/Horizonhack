import prisma from '@/lib/prisma'
import ArticleCard from '@/components/Article/Card'

export default async function RecentArticles() {
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
    take: 10,
  })
  // await new Promise((resolve) => setTimeout(resolve, 5000))

  return (
    <>
      {articles.map((article) => (
        <ArticleCard key={article.id} data={article} />
      ))}
      {articles.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          まだ、記事がありません 最初の投稿者になりませんか？
        </p>
      )}
    </>
  )
}
