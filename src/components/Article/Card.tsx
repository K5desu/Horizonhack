import Image from 'next/image'
import Tag from '@/components/Tag/Tag'
import TimeAgo from '@/components/TimeAgo'
import Link from 'next/link'

interface ArticleProps {
  id: string
  title: string | null
  created_at: Date
  author: {
    name: string | null
    image: string | null
  }
  tags: {
    id: number
    name: string
  }[]
}

export default function ArticleCard({ data }: { data: ArticleProps }) {
  const urlAuthor = `${data.author?.name || ''}`
  const urlArticle = `${urlAuthor}/articles/${data.id}`

  return (
    <article className="relative flex h-full flex-col gap-2 overflow-hidden rounded-lg border bg-gray-50 p-4 shadow-none transition hover:shadow-md dark:border-gray-700 dark:bg-slate-900 dark:shadow-slate-700/[.7] lg:p-5">
      <h2 className="flex text-lg font-bold normal-case text-gray-700 dark:text-white">
        <Link href={urlArticle} className="z-10 no-underline underline-offset-1 hover:underline">
          {data.title || 'Untitled'}
        </Link>
      </h2>
      <div className="relative flex w-auto flex-wrap gap-2">
        {data.tags.map((tag, index) => (
          <Tag key={index} name={tag.name} />
        ))}
      </div>
      <div className="relative flex flex-1 items-end justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <Link
            href={urlArticle || ''}
            className="relative z-10 h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white active:brightness-90"
          >
            <span className="absolute -inset-0.5" />
            <Image
              src={data.author.image || ''}
              width={72}
              height={72}
              className="h-8 w-8 rounded-full border object-cover dark:border-gray-700"
              alt="Writer's profile image"
            />
          </Link>
          <div className="z-10 text-xs text-gray-700 dark:text-white">
            <Link
              href={urlAuthor}
              tabIndex={-1}
              className="no-underline underline-offset-1 hover:underline"
            >
              @{data.author.name}
            </Link>
          </div>
        </div>
        <TimeAgo date={data.created_at} />
      </div>
      <Link href={urlArticle} tabIndex={-1} className="absolute inset-0" />
    </article>
  )
}
