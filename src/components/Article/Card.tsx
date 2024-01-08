import Image from 'next/image'
import Tag from '@/components/Tag'
import TimeAgo from '@/components/TimeAgo'

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
    <article className="relative flex gap-2 p-4 lg:p-5 flex-col bg-gray-50 overflow-hidden border shadow-none hover:shadow-md rounded-lg dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] transition">
      <h2 className="flex text-lg text-gray-700 normal-case dark:text-white font-bold">
        <a href={urlArticle} className="no-underline underline-offset-1 hover:underline z-10">
          {data.title || 'Untitled'}
        </a>
      </h2>
      <div className="relative flex w-auto flex-wrap gap-2">
        {data.tags.map((tag, index) => (
          <Tag key={index} name={tag.name} />
        ))}
      </div>
      <div className="relative flex justify-between items-end gap-x-2">
        <div className="flex items-center gap-x-2">
          <a
            href={urlArticle || ''}
            className="relative w-8 h-8 rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white active:brightness-90"
          >
            <span className="absolute -inset-0.5" />
            <Image
              src={data.author.image || ''}
              width={72}
              height={72}
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
              @{data.author.name}
            </a>
          </div>
        </div>
        <TimeAgo date={data.created_at} />
      </div>
      <a href={urlArticle} tabIndex={-1} className="absolute inset-0" />
    </article>
  )
}
