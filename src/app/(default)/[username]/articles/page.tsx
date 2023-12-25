import getUserProfile from '@/app/api/user/getUserProfile'
import Inner from '@/components/Inner'
import { getServerSession } from 'next-auth'

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
  const userProfile = await getUserProfile(params.username)
  const isCurrentUser = session?.user.name === params.username

  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const sort = searchParams?.sort || 'new'

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
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark"></div>
          </div>
        </Inner>
      </>
    )
  }

  return {}
}
