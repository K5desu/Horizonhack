import Inner from '@/components/Inner'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import ArticleCard from '@/components/Article/ArticleCard'
import WorkCard from '@/components/Works/WorkCard'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import getUserProfile from '@/app/api/user/getUserProfile'
import getUsersState from '@/app/api/user/getUserState'
import getUserArticles from '@/app/api/user/getUserArticles'

async function getUserWorksAll(username: string) {
  try {
    const works = await prisma.work.findMany({
      where: {
        author: {
          name: username,
        },
      },
      select: {
        id: true,
        title: true,
        url: true,
        img: true,
        created_at: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: -10,
    })
    return works
  } catch (error) {
    return []
  }
}

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const session = await getServerSession()
  const userProfile = await getUserProfile(params.username)
  const isCurrentUser = session?.user.name === params.username

  const usersState = await getUsersState(params.username, isCurrentUser)
  const articles = await getUserArticles(params.username, isCurrentUser)
  let works = await getUserWorksAll(params.username)

  const UserStatus = [
    { label: '記事', value: `${usersState.ArticleAmount}` },
    { label: '制作物', value: `${usersState.WorkAmount}` },
    { label: 'コメント', value: `${usersState.CommentAmount}` },
  ]

  return (
    <>
      <Inner>
        <header className="rounded-md border bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
          <div className="flex flex-col items-center flex-wrap gap-x-4 sm:flex-row">
            <div className="relative w-24 h-24 rounded-full">
              <span className="absolute -inset-0.5" />
              <Image
                src={userProfile?.image || ''}
                width={92}
                height={92}
                className="object-cover w-24 h-24 rounded-full"
                alt="User's profile image"
              />
            </div>
            <div className="normal-case mt-4 sm:mt-0">
              <h2 className="text-xl font-bold text-gray-700 dark:text-white">
                @ {userProfile?.name}
                <Link
                  href={`https://github.com/${userProfile?.name}/`}
                  className="text-xs rounded-lg p-1 ml-1 bg-gray-600/30 text-white no-underline underline-offset-1 hover:underline"
                >
                  GitHub &#8599;
                </Link>
              </h2>
              <div className="flex gap-2 mt-2">
                {UserStatus.map((status) => (
                  <div
                    key={status.label}
                    className="flex flex-col align-baseline text-xs text-gray-700 dark:text-white"
                  >
                    <span className="">{status.label}</span>
                    <span>{status.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
        <div className="flex justify-between items-end">
          <h3 className="text-xl mt-4 font-bold text-gray-800 dark:text-gray-50">記事</h3>
          {session?.user.name === params.username && (
            <div>
              <div className="inline-flex justify-center items-center">
                <span className="w-2 h-2 inline-block bg-green-500 rounded-full me-1"></span>
                <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  公開
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 mx-3">/</span>
              <div className="inline-flex justify-center items-center">
                <span className="w-2 h-2 inline-block bg-gray-500 rounded-full me-1"></span>
                <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  下書き
                </span>
              </div>
            </div>
          )}
        </div>
        <section className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <div className="relative" key={article.id}>
              <ArticleCard data={article} />
              {session?.user.name === params.username && (
                <>
                  <Link
                    className="absolute top-2 right-2 text-xs rounded-lg px-1.5 py-1 text-white bg-gray-600/30 dark:bg-gray-600/60 no-underline underline-offset-1 hover:underline"
                    href={`/articles/${article.id}/edit`}
                  >
                    編集
                  </Link>
                  <span
                    className={`${
                      article.visibility ? 'bg-green-500' : 'bg-gray-500'
                    } absolute w-2 h-2 top-4 right-12 inline-block rounded-full`}
                  ></span>
                </>
              )}
            </div>
          ))}
          {articles.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">まだ、記事がありません</p>
          )}
        </section>
        {usersState.ArticleAmount > 10 && (
          <div className="w-full flex justify-center">
            <Link
              href={`/${params.username}/articles`}
              className="w-full max-w-lg py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              もっと見る
            </Link>
          </div>
        )}
        <h3 className="text-xl mt-4 font-bold text-gray-800 dark:text-gray-50">制作物</h3>
        <section className="my-3 grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {works.map((work) => (
            <div className="relative" key={work.id}>
              <WorkCard data={work} />
              {session?.user.name === params.username && (
                <Link
                  className="absolute text-xs rounded-lg p-1 bg-gray-600/30 text-white top-2 right-2 no-underline underline-offset-1 hover:underline"
                  href={`/works/${work.id}/edit`}
                >
                  編集
                </Link>
              )}
            </div>
          ))}
          {works.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">まだ、制作物がありません</p>
          )}
        </section>
        {usersState.WorkAmount > 10 && (
          <div className="w-full flex justify-center">
            <Link
              href={`/${params.username}/works`}
              className="w-full max-w-lg py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              もっと見る
            </Link>
          </div>
        )}
      </Inner>
    </>
  )
}
