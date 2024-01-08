import getUserArticles from '@/app/api/user/getUserArticles'
import ArticleCard from '../Article/Card'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

interface UserArticlesProps {
  username: string
}

export default async function UserArticles({ username }: UserArticlesProps) {
  const session = await getServerSession()
  const isCurrentUser = session?.user?.name === username
  const articles = await getUserArticles({ username: username, isCurrentUser: isCurrentUser })

  // await new Promise((resolve) => setTimeout(resolve, 5000))
  return (
    <>
      {articles.map((article) => (
        <div className="relative group" key={article.id}>
          <ArticleCard data={article} />
          {isCurrentUser && (
            <>
              <Link
                className={`${
                  article.visibility
                    ? 'bg-green-600/50 dark:bg-green-600/60'
                    : 'bg-gray-600/50 dark:bg-gray-600/60'
                } absolute top-2 right-2 text-xs rounded-lg px-1.5 py-1 text-white no-underline underline-offset-1 hover:underline`}
                href={`/articles/${article.id}/edit`}
              >
                編集
              </Link>
            </>
          )}
        </div>
      ))}
      {articles.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">まだ、記事がありません</p>
      )}
    </>
  )
}
