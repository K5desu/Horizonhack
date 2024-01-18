import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export default async function SearchUsers({
  searchParams,
}: {
  searchParams?: {
    q?: string | undefined
    page?: string | undefined
    sort?: 'new' | 'old' | undefined
  }
}) {
  const skip = (Number(searchParams?.page) - 1) * 10 || 0
  const searchParamsQ = searchParams?.q?.split(' OR ') || []
  const users = await prisma.user.findMany({
    where: {
      OR: searchParamsQ.map((query) => ({
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            displayName: {
              contains: query,
            },
          },
        ],
      })),
    },
    select: {
      id: true,
      name: true,
      displayName: true,
      image: true,
      role: true,
    },
    take: 10,
    skip: skip,
  })

  return (
    <>
      {users.map((user, index) => (
        <Link
          key={user.id}
          href={`/${user.name}`}
          className={`flex w-full items-center py-2 border-t ${
            index === users.length - 1 ? 'border-b' : ''
          } border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition group`}
        >
          <Image
            src={user.image || ''}
            alt={user.displayName || ''}
            className="w-10 h-10 rounded-full mr-4"
            width={64}
            height={64}
          />
          <div className="flex flex-col">
            <span className="text-gray-800 dark:text-gray-100 font-semibold">
              {user.displayName}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm group-hover:underline">
              @{user.name}
            </span>
          </div>
          <div className="ml-auto">
            <span className="text-gray-500 dark:text-gray-400 text-sm mx-2">
              {user.role === 'official' && '公式'}
              {user.role === 'admin' && '管理者'}
            </span>
          </div>
        </Link>
      ))}
      {users.length === 0 && <p className="text-gray-500 dark:text-gray-400">検索結果 0件</p>}
    </>
  )
}
