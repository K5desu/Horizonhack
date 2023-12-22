import Inner from '@/components/Inner'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/Article/ArticleCard'
import WorkCard from '@/components/Works/WorkCard'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

async function getUserProfile(username: string) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        name: username,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    })
    return user
  } catch (error) {
    return notFound()
  }
}

async function getUsersStateAll(username: string) {
  const ArticleAmount = await prisma.user.count({
    where: {
      name: username,
      article: {
        some: {},
      },
    },
  })
  const WorkAmount = await prisma.user.count({
    where: {
      name: username,
      work: {
        some: {},
      },
    },
  })
  const CommentAmount = await prisma.user.count({
    where: {
      comment: {
        some: {},
      },
    },
  })
  return { ArticleAmount, WorkAmount, CommentAmount }
}
async function getUsersStatePublish(username: string) {
  const ArticleAmount = await prisma.user.count({
    where: {
      name: username,
      article: {
        some: {
          visibility: true,
        },
      },
    },
  })
  const WorkAmount = await prisma.user.count({
    where: {
      name: username,
      work: {
        some: {},
      },
    },
  })
  const CommentAmount = await prisma.user.count({
    where: {
      comment: {
        some: {},
      },
    },
  })
  return { ArticleAmount, WorkAmount, CommentAmount }
}

async function getUserArticlesAll(username: string) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        author: {
          name: username,
        },
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
    return articles
  } catch (error) {
    return []
  }
}
async function getUserArticlesPublish(username: string) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        author: {
          name: username,
        },
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
    return articles
  } catch (error) {
    return []
  }
}

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

  let usersState = { ArticleAmount: 0, WorkAmount: 0, CommentAmount: 0 }
  let articles = []
  if (session?.user.name === params.username) {
    usersState = await getUsersStateAll(session?.user.name)
    articles = await getUserArticlesAll(session?.user.name)
  } else {
    usersState = await getUsersStatePublish(params.username)
    articles = await getUserArticlesPublish(params.username)
  }
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
        <h3 className="text-xl mt-4 font-bold text-gray-800 dark:text-gray-50">記事</h3>
        <section className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <div className="relative" key={article.id}>
              <ArticleCard data={article} />
              {session?.user.name === params.username && (
                <Link
                  className="text-xs rounded-lg p-1 bg-gray-800/30 text-white absolute top-2 right-2 dark:bg-gray-800/60"
                  href={`/articles/${article.id}/edit`}
                >
                  編集
                </Link>
              )}
            </div>
          ))}
          {articles.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">まだ、記事がありません</p>
          )}
        </section>
        <h3 className="text-xl mt-4 font-bold text-gray-800 dark:text-gray-50">制作物</h3>
        <section className="my-3 grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {works.map((work) => (
            <div className="relative" key={work.id}>
              <WorkCard data={work} />
              {session?.user.name === params.username && (
                <Link
                  className="text-xs rounded-lg p-1 bg-gray-800/20 text-white absolute top-2 right-2 "
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
      </Inner>
    </>
  )
}
