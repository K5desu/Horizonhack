import Image from 'next/image'
import Tag from '../Tag'

interface ArticleProps {
  id: string
  title: string
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
  const urlArticle = `${data.author?.name || ''}/articles/${data.id}`
  const urlAuthor = `${data.author?.name}`

  return (
    <article className="relative flex gap-2 p-4 lg:p-5 flex-col bg-white border shadow-none hover:shadow-md rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] transition">
      <h2 className="flex text-lg text-gray-700 capitalize dark:text-white font-bold">
        <a href={urlArticle} className="no-underline underline-offset-1 hover:underline z-10">
          {data.title}
        </a>
      </h2>
      <div className="relative flex w-auto flex-wrap gap-2">
        {data.tags.map((tag, index) => (
          <Tag key={index} name={tag.name} />
        ))}
      </div>
      <div className="relative flex justify-between items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <a
            href={urlArticle}
            className="relative w-8 h-8 rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white active:brightness-90"
          >
            <span className="absolute -inset-0.5" />
            <Image
              src={data.author.image || ''}
              width={32}
              height={32}
              className="object-cover w-8 h-8 rounded-full"
              alt="Writer's profile image"
            />
          </a>
          <div className="text-xs text-gray-700 capitalize z-10 dark:text-white">
            <a
              href={urlAuthor}
              tabIndex={-1}
              className="no-underline underline-offset-1 hover:underline"
            >
              {data.author.name}
            </a>
          </div>
        </div>
        <time dateTime={data.created_at.toISOString()} className="text-xs">
          {data.created_at.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>
      </div>
      <a href={urlArticle} tabIndex={-1} className="absolute inset-0" />
    </article>
  )
}
