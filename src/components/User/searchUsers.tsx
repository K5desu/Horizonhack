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
          className={`flex w-full items-center border-t py-2 ${
            index === users.length - 1 ? 'border-b' : ''
          } group border-gray-300 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800`}
        >
          <Image
            src={user.image || ''}
            alt={user.displayName || ''}
            className="mr-4 h-10 w-10 rounded-full"
            width={64}
            height={64}
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {user.displayName}
            </span>
            <span className="text-sm text-gray-500 group-hover:underline dark:text-gray-400">
              @{user.name}
            </span>
          </div>
          <div className="ml-auto">
            <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">
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
