import getUserWorks from '@/app/api/user/getUserWorks'
import WorkCard from '@/components/Work/Card'
import Link from 'next/link'

interface UserWorksProps {
  username: string
  isCurrentUser: boolean
  searchParams?: {
    page?: string
    sort?: 'new' | 'old' | undefined
  }
}

export default async function UserWorks({ username, isCurrentUser, searchParams }: UserWorksProps) {
  const works = await getUserWorks({
    username: username,
    isCurrentUser: isCurrentUser,
    page: searchParams?.page ? Number(searchParams.page) : 1,
    sort: searchParams?.sort || 'new',
  })
  return (
    <>
      {works.map((work) => (
        <div className="relative" key={work.id}>
          <WorkCard data={work} />
          {isCurrentUser && (
            <Link
              className={`${
                work.visibility
                  ? 'bg-green-600/50 dark:bg-green-600/60'
                  : 'bg-gray-600/50 dark:bg-gray-600/60'
              } absolute right-2 top-2 rounded-lg px-1.5 py-1 text-xs text-white no-underline underline-offset-1 hover:underline`}
              href={`/works/${work.id}/edit`}
            >
              編集
            </Link>
          )}
        </div>
      ))}
      {works.length === 0 && Number(searchParams?.page) === 0 && (
        <p className="text-gray-500 dark:text-gray-400">まだ、成果物がありません</p>
      )}
      {works.length === 0 && Number(searchParams?.page) !== 0 && (
        <p className="text-gray-500 dark:text-gray-400">このページには成果物がありません</p>
      )}
    </>
  )
}
