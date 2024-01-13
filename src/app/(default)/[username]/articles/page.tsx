import getUserArticlesAmount from '@/app/api/user/getUserArticlesAmount'
import Inner from '@/components/Inner'
import Pagination from '@/components/Pagination'
import SortBtn from '@/components/SortBtn'
import SearchUserArticles from '@/components/User/SearchArticles'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function UserArticlesPage({
  params,
  searchParams,
}: {
  params: { username: string }
  searchParams?: {
    query?: string
    page?: string
    sort?: 'new' | 'old' | undefined
  }
}) {
  const session = await getServerSession()
  const username = params.username
  const isCurrentUser = session?.user.name === username

  const totalArticles = await getUserArticlesAmount({
    username: username,
    isCurrentUser: isCurrentUser,
  })
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = Math.ceil(totalArticles / 10)

  if (session) {
    return (
      <>
        <Inner>
          <header>
            <nav className="flex mb-3" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      href={`/${params.username}`}
                      className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      {params.username}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      Articles
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">
                {params.username}&#039;s Articles
              </h1>
            </div>
            <div className="flex justify-end">
              {/* <p className="text-gray-700 dark:text-gray-300">{totalArticles} articles</p> */}
              <SortBtn sort={searchParams?.sort} />
            </div>
          </header>
          <div className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <SearchUserArticles
              username={username}
              isCurrentUser={isCurrentUser}
              searchParams={searchParams}
            />
          </div>
          <Pagination totalPages={totalPages} />
        </Inner>
      </>
    )
  }
}
