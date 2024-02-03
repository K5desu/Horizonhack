import Inner from '@/components/Inner'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import getUserProfile from '@/app/api/user/getUserProfile'
import getUsersState from '@/app/api/user/getUserState'
import { Metadata } from 'next'
import { Suspense } from 'react'
import UserWorks from '@/components/User/Works'
import { ArticleCardSkeletons, WorkCardSkeletons } from '@/components/Skeleton/skeletons'
import SortBtn from '@/components/SortBtn'
import Pagination from '@/components/Pagination'
import UserArticles from '@/components/User/Articles'
import UserTags from '@/components/User/Tags'
import UserComments from '@/components/User/Comments'

interface UserProfilePageProps {
  params: {
    username: string
  }
  searchParams: {
    q?: string
    target?: string
    page?: string
    sort?: 'new' | 'old' | undefined
  }
}

export async function generateMetadata({
  params: { username },
}: UserProfilePageProps): Promise<Metadata> {
  const userProfile = await getUserProfile(username)
  return {
    title: `${userProfile?.displayName}さんのプロフィール | Link Mono`,
    description: `${userProfile?.displayName}さんのプロフィール`,
  }
}

export default async function UserProfilePage({ params, searchParams }: UserProfilePageProps) {
  const username = params.username
  const userProfile = await getUserProfile(username)
  const session = await getServerSession()
  const isCurrentUser = session?.user.name === username
  const usersState = await getUsersState(username, isCurrentUser)

  const searchArticlesParams = {
    page: searchParams?.page,
    sort: searchParams?.sort,
  }
  const searchWorksParams = {
    page: searchParams?.page,
    sort: searchParams?.sort,
  }
  const searchTagsParams = {
    page: searchParams?.page,
    sort: searchParams?.sort,
  }
  const searchCommentsParams = {
    page: searchParams?.page,
    sort: searchParams?.sort,
  }

  let targets = [
    {
      name: 'articles',
      amount: usersState.ArticleAmount,
      isActive: searchParams?.target === 'articles' || !searchParams?.target ? true : false,
    },
    {
      name: 'works',
      amount: usersState.WorkAmount,
      isActive: searchParams?.target === 'works' ? true : false,
    },
    {
      name: 'tags',
      amount: usersState.TagAmount,
      isActive: searchParams?.target === 'tags' ? true : false,
    },
    {
      name: 'comments',
      amount: usersState.CommentAmount,
      isActive: searchParams?.target === 'comments' ? true : false,
    },
  ]
  const calculateItemsOnPage = ({ amount, page = 1 }: { amount: number; page?: number }) => {
    page = page || 1
    const lowerBound = 10 * (page - 1)
    const upperBound = 10 * page
    if (page <= 0 || amount <= lowerBound) return 0
    return amount < upperBound ? amount - lowerBound : 10
  }

  return (
    <>
      <Inner>
        <header className="overflow-hidden rounded-md border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900 lg:p-6">
          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <div className="relative mx-auto h-24 w-24 rounded-full sm:mx-0">
              <span className="absolute -inset-0.5" />
              <Image
                src={userProfile?.image || ''}
                width={128}
                height={128}
                className="h-24 w-24 rounded-full border object-cover dark:border-gray-700"
                alt="User's profile image"
              />
            </div>
            <div className="mx-auto flex flex-col sm:mx-0">
              <div className="flex h-auto flex-col items-center gap-2 sm:h-24 sm:flex-row">
                <div className="mt-4 text-center normal-case sm:mt-0 sm:text-left">
                  {userProfile?.displayName && (
                    <>
                      <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
                        {userProfile?.displayName}
                      </h2>
                      <div className="flex flex-col justify-center sm:flex-row">
                        <span className="text-md font-semibold text-gray-700 dark:text-gray-50/70">
                          @{userProfile?.name}
                        </span>
                        <Link
                          href={`https://github.com/${userProfile?.name}/`}
                          className="m-0 mx-auto block rounded-full bg-gray-100 p-0.5 text-xs font-semibold text-gray-700 no-underline underline-offset-1 hover:underline dark:bg-gray-600/30 dark:text-white sm:ml-1"
                        >
                          <svg className="h-auto w-5 fill-current" viewBox="0 0 24 24" fill="none">
                            <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z" />
                          </svg>
                        </Link>
                      </div>
                    </>
                  )}
                  {!userProfile?.displayName && (
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
                      @{userProfile?.name}
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="my-4 flex">
          {session?.user.name === username && (
            <div>
              <div className="inline-flex items-center justify-center">
                <span className="me-1 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  公開
                </span>
              </div>
              <span className="mx-3 text-xs font-semibold text-gray-600 dark:text-gray-400">/</span>
              <div className="inline-flex items-center justify-center">
                <span className="me-1 inline-block h-2 w-2 rounded-full bg-gray-500"></span>
                <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  下書き
                </span>
              </div>
            </div>
          )}
        </div>
        <nav className="mb-3 flex flex-wrap justify-between gap-y-2">
          <ul className="flex flex-wrap items-center gap-2">
            {targets.map((target) => (
              <li key={target.name} className="m-0 list-none">
                <Link
                  href={
                    target.isActive
                      ? ''
                      : `/${username}?target=${target.name}${
                          (searchParams?.sort && `&sort=${searchParams?.sort}`) || ''
                        }`
                  }
                  className={`inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium dark:border-gray-700 ${
                    target.isActive
                      ? 'bg-sky-700 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-200'
                  }`}
                >
                  {target.name === 'articles' && '記事'}
                  {target.name === 'works' && '成果物'}
                  {target.name === 'tags' && 'タグ'}
                  {target.name === 'comments' && 'コメント'}
                  <span className="ml-1 inline-block rounded-md bg-gray-300 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-500 dark:text-gray-100">
                    {target.amount}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {!targets[2].isActive && <SortBtn sort={searchParams?.sort || 'new'} />}
        </nav>
        <main className="my-4">
          {targets[0].isActive && (
            <>
              <section className="relative grid grid-cols-1 gap-4 md:grid-cols-2">
                <Suspense
                  fallback={
                    <ArticleCardSkeletons
                      amount={calculateItemsOnPage({
                        amount: usersState.ArticleAmount,
                        page: Number(searchParams?.page),
                      })}
                    />
                  }
                >
                  <UserArticles
                    username={username}
                    isCurrentUser={isCurrentUser}
                    searchParams={searchArticlesParams}
                  />
                  {usersState.ArticleAmount > 10 && (
                    <div className="flex w-full justify-center md:col-start-1 md:col-end-3">
                      <Pagination totalPages={Math.ceil(usersState.ArticleAmount / 10)} />
                    </div>
                  )}
                </Suspense>
              </section>
            </>
          )}
          {targets[1].isActive && (
            <>
              <section className="relative my-3 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Suspense
                  fallback={
                    <WorkCardSkeletons
                      amount={calculateItemsOnPage({
                        amount: usersState.WorkAmount,
                        page: Number(searchParams?.page),
                      })}
                    />
                  }
                >
                  <UserWorks
                    username={username}
                    isCurrentUser={isCurrentUser}
                    searchParams={searchWorksParams}
                  />
                  {usersState.WorkAmount > 10 && (
                    <div className="flex w-full justify-center md:col-start-1 md:col-end-3">
                      <Pagination totalPages={Math.ceil(usersState.WorkAmount / 10)} />
                    </div>
                  )}
                </Suspense>
              </section>
            </>
          )}
          {targets[2].isActive && (
            <>
              <section className="relative my-3">
                <Suspense fallback={<>検索中...</>}>
                  <UserTags username={username} />
                  {usersState.TagAmount > 10 && (
                    <div className="flex w-full justify-center md:col-start-1 md:col-end-3">
                      <Pagination totalPages={Math.ceil(usersState.TagAmount / 10)} />
                    </div>
                  )}
                </Suspense>
              </section>
            </>
          )}
          {targets[3].isActive && (
            <>
              <section className="relative my-3 flex flex-col gap-4">
                <Suspense fallback={<>検索中...</>}>
                  <UserComments username={username} searchParams={searchCommentsParams} />
                  {usersState.CommentAmount > 10 && (
                    <div className="flex w-full justify-center md:col-start-1 md:col-end-3">
                      <Pagination totalPages={Math.ceil(usersState.CommentAmount / 10)} />
                    </div>
                  )}
                </Suspense>
              </section>
            </>
          )}
        </main>
      </Inner>
    </>
  )
}
