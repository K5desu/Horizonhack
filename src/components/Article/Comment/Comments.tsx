import Link from 'next/link'
import Image from 'next/image'
import DeleteCommentForm from './DeleteForm'
import { getServerSession } from 'next-auth'
import getComments from '@/app/api/article/comment/getComments'
import TimeAgo from '@/components/TimeAgo'

export default async function Comments({ articleId }: { articleId: string }) {
  const session = await getServerSession()
  const sessionUserName = session?.user?.name
  const comments = await getComments(articleId)

  return (
    <>
      {comments.map((comment, index) => (
        <li
          key={comment.id}
          className={`flex flex-col border-t text-gray-500 dark:text-gray-400 ${
            index === comments.length - 1 ? 'border-b' : ''
          } border-gray-300 py-4 dark:border-gray-700`}
        >
          <div className="flex w-full flex-wrap justify-between">
            <div className="flex items-center gap-x-2">
              <Link
                href={`/${comment.author.name}`}
                className="relative z-10 h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white active:brightness-90"
              >
                <span className="absolute -inset-0.5" />
                <Image
                  src={comment.author.image || ''}
                  width={72}
                  height={72}
                  className="h-8 w-8 rounded-full border object-cover dark:border-gray-700"
                  alt="Writer's profile image"
                />
              </Link>
              <div className="z-10 text-xs capitalize text-gray-700 dark:text-white">
                <Link
                  href={`/${comment.author.name}`}
                  tabIndex={-1}
                  className="no-underline underline-offset-1 hover:underline"
                >
                  @{comment.author.name}
                </Link>
              </div>
              <div className="z-10 text-xs capitalize text-gray-700 dark:text-white">
                <TimeAgo date={comment.created_at} />
              </div>
            </div>
            {comment.author.name === sessionUserName && (
              <DeleteCommentForm
                articleId={articleId}
                commentId={String(comment.id)}
                authorName={sessionUserName}
              />
            )}
          </div>

          <p className="text-md text-wrap ml-10 mt-2 overflow-y-scroll">{comment.body}</p>
        </li>
      ))}
      {comments.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          まだ、コメントがありません。{session && '投稿者を応援しましょう！'}
        </p>
      )}
    </>
  )
}
