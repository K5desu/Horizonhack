import getUserArticles from '@/app/api/user/getUserArticles'
import ArticleCard from '../Article/Card'
import Link from 'next/link'

interface UserArticlesProps {
  username: string
  isCurrentUser: boolean
  searchParams?: {
    page?: string
    sort?: 'new' | 'old' | undefined
  }
}

export default async function UserArticles({
  username,
  isCurrentUser,
  searchParams,
}: UserArticlesProps) {
  const articles = await getUserArticles({
    username: username,
    isCurrentUser: isCurrentUser,
    page: searchParams?.page ? Number(searchParams.page) : 1,
    sort: searchParams?.sort || 'new',
  })
  return (
    <>
      {articles.map((article) => (
        <div className="group relative" key={article.id}>
          <ArticleCard data={article} />
          {isCurrentUser && (
            <>
              <Link
                className={`${
                  article.visibility
                    ? 'bg-green-600/50 dark:bg-green-600/60'
                    : 'bg-gray-600/50 dark:bg-gray-600/60'
                } absolute right-2 top-2 rounded-lg px-1.5 py-1 text-xs text-white no-underline underline-offset-1 hover:underline`}
                href={`/articles/${article.id}/edit`}
              >
                編集
              </Link>
            </>
          )}
        </div>
      ))}
      {articles.length === 0 && Number(searchParams?.page) === 0 && (
        <p className="text-gray-500 dark:text-gray-400">まだ、記事がありません</p>
      )}
      {articles.length === 0 && Number(searchParams?.page) !== 0 && (
        <p className="text-gray-500 dark:text-gray-400">このページには記事がありません</p>
      )}
    </>
  )
}
