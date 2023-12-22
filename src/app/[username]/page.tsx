import Inner from '@/components/Inner'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import UserNavs from '@/components/UserNavs'

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

async function getUsersState(username: string) {
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

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const userProfile = await getUserProfile(params.username)
  const usersState = await getUsersState(params.username)

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
        <UserNavs userProfile={userProfile ?? { id: '', name: null, image: null }} />
        {/* <UserContents /> */}
      </Inner>
    </>
  )
}
