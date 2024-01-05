import getUserArticles from '@/app/api/user/getUserArticles'
import getUserProfile from '@/app/api/user/getUserProfile'
import Inner from '@/components/Inner'
import Pagination from '@/components/Pagination'
import { getServerSession } from 'next-auth'
import router from 'next/router'

export default async function UserArticlesPage({
  params,
  searchParams,
}: {
  params: { username: string }
  searchParams?: {
    query?: string
    page?: string
    sort?: string
  }
}) {
  const session = await getServerSession()
  const username = params.username
  const userProfile = await getUserProfile(username)
  const isCurrentUser = session?.user.name === username

  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const sort = searchParams?.sort || 'new'

  const handlePageChange = (page: number) => {
    router.push({
      pathname: `/${params.username}/articles`,
      query: { ...searchParams, page: page.toString() },
    })
  }

  try {
    const articles = await getUserArticles({
      username: username,
      isCurrentUser: isCurrentUser,
      page: currentPage,
      sort: sort as 'new' | 'old',
    })

    if (session) {
      return (
        <>
          <Inner>
            <header>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{params.username}&#039;s Articles</h1>
              </div>
            </header>
            <div className="w-full max-w-md mx-auto my-10 p-6">
              {articles.map((article) => (
                <div key={article.id}>
                  <h2>{article.title}</h2>
                  {/* 他の記事情報の表示 */}
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
          </Inner>
        </>
      )
    }
  } catch (error) {
    console.error('Error fetching user articles:', error)
    throw error
  }

  return {}
}
