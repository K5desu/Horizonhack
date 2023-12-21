import prisma from '@/lib/prisma'
import Inner from '@/components/Inner'
import Image from 'next/image'
import Markdown from '@/components/Article/Markdown'
import Tag from '@/components/Tag'

export default async function UserArticlePage({
  params,
}: {
  params: { username: string; id: string }
}) {
  const article = await prisma.article.findUniqueOrThrow({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
      body: true,
      created_at: true,
      updated_At: true,
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

  const formatbody = article.body.replace(/\\`/g, '`')

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
              {article.updated_At && (
                <time dateTime={article.updated_At.toISOString()}>
                  {article.updated_At.toLocaleDateString('ja-JP', {
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
            <time dateTime={article.created_at.toISOString()} className="text-xs">
              {article.created_at.toLocaleDateString()}
            </time>
          </div>
        </header>
        <Markdown markdown={formatbody} />
      </Inner>
    </>
  )
}
