import { Suspense, cache } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import Inner from '@/components/Inner'
import Markdown from '@/components/Article/Markdown'
import Tag from '@/components/Tag/Tag'
import AddCommentForm from '@/components/Article/Comment/AddForm'

import prisma from '@/lib/prisma'
import { Metadata } from 'next'
import Comments from '@/components/Article/Comment/Comments'

interface ArticlePageProps {
  params: {
    username: string
    articleId: string
  }
}
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const getArticle = cache(async (articleId: string) => {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: {
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

  if (!article) return notFound()
  return article
})

export async function generateMetadata({
  params: { username, articleId },
}: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(articleId)

  return {
    title: `${article?.title} | Link Mono`,
    description: `${article?.body?.slice(0, 100)}...`,
  }
}

export default async function UserArticlePage({
  params: { username, articleId },
}: ArticlePageProps) {
  const article = await getArticle(articleId)

  const session = await getServerSession()
  const sessionUserName = session?.user.name
  if (!article.visibility && article.author.name !== sessionUserName) {
    return null
  }

  const formatbody = article?.body?.replace(/\\`/g, '`')

  return (
    <>
      <Inner>
        <header className="relative">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{article?.title}</h1>
          {article?.tags && article?.tags.length > 0 && (
            <div className="flex items-center gap-x-2 mt-4">
              {article?.tags.map((tag) => <Tag key={tag.id} name={tag.name} />)}
            </div>
          )}
          <div className="flex gap-2 flex-wrap items-center mt-4 text-xs dark:text-gray-300">
            <span>
              <span>作成日:</span>
              <time dateTime={article?.created_at.toISOString()}>
                {article?.created_at.toLocaleDateString('ja-JP', {
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
              {article?.updated_at && (
                <time dateTime={article?.updated_at.toISOString()}>
                  {article?.updated_at.toLocaleDateString('ja-JP', {
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
            <Link
              href={`/${article?.author.name}`}
              className="relative w-8 h-8 rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white active:brightness-90"
            >
              <span className="absolute -inset-0.5" />
              <Image
                src={article?.author.image || ''}
                width={72}
                height={72}
                className="object-cover w-8 h-8 rounded-full"
                alt="Writer's profile image"
              />
            </Link>
            <div className="text-xs text-gray-700 capitalize z-10 dark:text-white">
              <Link
                href={`/${article?.author.name}`}
                tabIndex={-1}
                className="no-underline underline-offset-1 hover:underline"
              >
                @{article?.author.name}
              </Link>
            </div>
          </div>
          {sessionUserName === username && (
            <Link
              href={`/articles/${articleId}/edit`}
              className="absolute top-0 right-0 text-xs bg-blue-500 text-white px-2 py-1 rounded-xl"
            >
              編集
            </Link>
          )}
        </header>
        <Markdown markdown={formatbody || 'undefined'} />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">コメント</h2>
        <section className="my-2 p-4 sm:p-6 lg:p-8 rounded-md bg-slate-50 dark:bg-gray-900">
          <Suspense fallback={<p className="text-gray-800 dark:text-white">読み込み中...</p>}>
            <ul className="">
              <Comments articleId={articleId} />
            </ul>
            {session && (
              <AddCommentForm
                articleId={articleId}
                articleAuthor={article.author.name}
                authorName={sessionUserName}
              />
            )}
          </Suspense>
        </section>
      </Inner>
    </>
  )
}
