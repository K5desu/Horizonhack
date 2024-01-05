import getUserWorks from '@/app/api/user/getUserWorks'
import { getServerSession } from 'next-auth'
import WorkCard from '@/components/Work/Card'
import Link from 'next/link'

interface UserWorksProps {
  username: string
}

export default async function UserWorks({ username }: UserWorksProps) {
  const session = await getServerSession()
  const isCurrentUser = session?.user?.name === username
  const works = await getUserWorks({ username: username, isCurrentUser: isCurrentUser })

  await new Promise((resolve) => setTimeout(resolve, 5000))
  return (
    <>
      {works.map((work) => (
        <div className="relative" key={work.id}>
          <WorkCard data={work} />
          {session?.user.name === username && (
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
    </>
  )
}
