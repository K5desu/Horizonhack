import Image from 'next/image'
import Tag from '@/components/Tag'

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

const timeAgo = (date: Date) => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  let displayDate = ''

  if (diffDays >= 7) {
    if (date.getFullYear() !== now.getFullYear()) {
      displayDate = date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } else {
      displayDate = date.toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric',
      })
    }
  } else if (diffDays > 0) {
    displayDate = `${diffDays}日前`
  } else if (diffHours > 0) {
    displayDate = `${diffHours}時間前`
  } else if (diffMinutes > 0) {
    displayDate = `${diffMinutes}分前`
  } else {
    displayDate = 'たった今'
  }

  return (
    <time dateTime={date.toISOString()} className="text-xs text-gray-800 dark:text-gray-50">
      {displayDate}
    </time>
  )
}

export default function ArticleCard({ data }: { data: ArticleProps }) {
  const urlAuthor = `${data.author?.name || ''}`
  const urlArticle = `${urlAuthor}/articles/${data.id}`

  return (
    <article className="relative flex gap-2 p-4 lg:p-5 flex-col bg-gray-50 border shadow-none hover:shadow-md rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] transition">
      <h2 className="flex text-lg text-gray-700 normal-case dark:text-white font-bold">
        <a href={urlArticle} className="no-underline underline-offset-1 hover:underline z-10">
          {data.title || 'Unknown'}
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
              @ {data.author.name}
            </a>
          </div>
        </div>
        {timeAgo(data.created_at) || ''}
      </div>
      <a href={urlArticle} tabIndex={-1} className="absolute inset-0" />
    </article>
  )
}
