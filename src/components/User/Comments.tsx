import prisma from '@/lib/prisma'
import Link from 'next/link'
import TimeAgo from '../TimeAgo'

interface UserCommentsProps {
  username: string
  searchParams?: {
    page?: string
    sort?: 'new' | 'old' | undefined
  }
}

export default async function UserComments({ username, searchParams }: UserCommentsProps) {
  const pageSize = 10
  const skip = (Number(searchParams?.page) - 1) * pageSize || 0
  const sort = searchParams?.sort || 'new'

  const comments = await prisma.user.findMany({
    where: {
      name: username,
    },
    select: {
      comments: {
        select: {
          id: true,
          body: true,
          created_at: true,
          article: {
            select: {
              id: true,
              title: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: sort === 'new' ? 'desc' : 'asc',
        },
        skip,
        take: pageSize,
      },
    },
  })

  const CommentsList = comments[0].comments.map((comment) => ({
    id: comment.id,
    body: comment.body,
    created_at: comment.created_at,
    article: {
      id: comment.article.id,
      title: comment.article.title,
      authorName: comment.article.author.name,
    },
  }))

  return (
    <>
      <ul>
        {CommentsList.map((comment, index) => (
          <li
            className={`flex flex-col justify-between border-t p-4 ${
              index === CommentsList.length - 1 ? 'border-b' : ''
            } border-gray-300 dark:border-gray-700`}
            key={comment.id}
          >
            <div className="flex items-center justify-between">
              <Link
                href={`/${comment.article.authorName}/articles/${comment.article.id}`}
                className="text-md font-bold text-gray-900 dark:text-gray-100"
              >
                {comment.article.title || 'Untitled'}
              </Link>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                <TimeAgo date={comment.created_at} />
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{comment.body}</p>
          </li>
        ))}
      </ul>
      {CommentsList.length === 0 && Number(searchParams?.page) === 0 && (
        <p className="text-gray-500 dark:text-gray-400">まだ、コメントがありません</p>
      )}
      {CommentsList.length === 0 && Number(searchParams?.page) !== 0 && (
        <p className="text-gray-500 dark:text-gray-400">このページにはコメントがありません</p>
      )}
    </>
  )
}
