import prisma from '@/lib/prisma'
import Inner from '@/components/Inner'
import Image from 'next/image'
import Markdown from '@/components/Article/Markdown'
import Tag from '@/components/Tag'
import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function UserArticlePage({
  params,
}: {
  params: { username: string; id: string }
}) {
  const session = await getServerSession()
  let article = null
  try {
    article = await prisma.article.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        title: true,
        body: true,
        created_at: true,
        updated_at: true,
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
    })
  } catch (error) {
    return notFound()
  }

  const formatbody = article.body?.replace(/\\`/g, '`')
  const comment = await prisma.comment.findMany({
    where: {
      articleId: article.id,
    },
    select: {
      id: true,
      comments: true,
      created_at: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  const postComment = async (formData: FormData) => {
    'use server'
    const rawFormData = {
      comments: formData.get('comments') as string | null,
      articleId: params.id as string,
      authorId: session?.user.id as string,
    }
    console.log(rawFormData)
    try {
      const comment = await prisma.comment.create({
        data: {
          comments: rawFormData.comments as string,
          author: {
            connect: {
              id: rawFormData.authorId as string,
            },
          },
          article: {
            connect: {
              id: rawFormData.articleId as string,
            },
          },
        },
      })
    } catch (error) {
      return new Error('コメントの投稿に失敗しました。')
    }
    redirect(`/`)
  }

  return (
    <>
      <Inner>
        <header>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{article.title}</h1>
          {article.tags.length > 0 && (
            <div className="flex items-center gap-x-2 mt-4">
              {article.tags.map((tag) => (
                <Tag key={tag.id} name={tag.name} />
              ))}
            </div>
          )}
          <div className="flex gap-2 flex-wrap items-center mt-4 text-xs dark:text-gray-300">
            <span>
              <span>作成日:</span>
              <time dateTime={article.created_at.toISOString()}>
                {article.created_at.toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </time>
            </span>
            <span>
              <span>更新日:</span>
              {article.updated_at && (
                <time dateTime={article.updated_at.toISOString()}>
                  {article.updated_at.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}
                </time>
              )}
            </span>
          </div>
          <div className="flex items-center gap-x-2 mt-4">
            <a
              href={`/${article.id}`}
              className="relative w-8 h-8 rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white active:brightness-90"
            >
              <span className="absolute -inset-0.5" />
              <Image
                src={article.author.image || ''}
                width={32}
                height={32}
                className="object-cover w-8 h-8 rounded-full"
                alt="Writer's profile image"
              />
            </a>
            <div className="text-xs text-gray-700 capitalize z-10 dark:text-white">
              <a
                href={`/${article.author.name}`}
                tabIndex={-1}
                className="no-underline underline-offset-1 hover:underline"
              >
                {article.author.name}
              </a>
            </div>
          </div>
        </header>
        <Markdown markdown={formatbody || ''} />
        <h2>コメント</h2>
        <section className="my-2 p-4 sm:p-6 lg:p-8 rounded-md bg-slate-50 dark:bg-gray-900">
          {comment.map((comment) => (
            <div key={comment.id}>
              <p className="text-gray-500 dark:text-gray-400">
                {comment.author.name}: {comment.comments}
              </p>
            </div>
          ))}
          {comment.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              まだ、コメントがありません。投稿者を応援しましょう！
            </p>
          )}
          <form action={postComment} className="flex mt-4">
            <input
              type="text"
              name="comments"
              className="py-3 px-4 block border w-full border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Comment input"
              required
            />
            <input
              type="submit"
              className="text-gray-500 dark:text-gray-400 ml-2 py-3 px-4 block border rounded-lg border-gray-300"
            />
          </form>
        </section>
      </Inner>
    </>
  )
}
