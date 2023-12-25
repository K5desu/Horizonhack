import Image from 'next/image'

interface WorkProps {
  id: string
  title: string | null
  url: string | null
  img: string | null
  created_at: Date
  updated_at: Date
  author: {
    name: string | null
    image: string | null
  }
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

export default function WorkCard({ data }: { data?: WorkProps }) {
  return (
    <div className="relative flex flex-col bg-gray-50 border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <a href={data?.url ?? ''} tabIndex={-1} className="absolute inset-0" />
      <div className="relative">
        <span className="absolute -inset-0.5" />
        <Image
          width={512}
          height={512}
          className="w-full h-auto max-h-48 rounded-t-xl object-cover"
          src={data?.img ?? '/test-image-unsplash.jpg'}
          alt="Work image"
        />
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {data?.title ? data.title : 'Unknown'}
        </h3>
        <p className="text-md mt-1 text-gray-500 dark:text-gray-400">
          {data?.author.name ? data.author.name : 'Unknown'}
        </p>

        <div className="flex flex-wrap justify-between mt-2">
          <a href="#" className="relative text-xs text-gray-500 dark:text-gray-400 hover:underline">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              src={data?.author.image ?? '/test-image-unsplash.jpg'}
              alt="your avater image"
              width={128}
              height={128}
            />
          </a>
          <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
            {data?.created_at.toLocaleDateString() ? timeAgo(data.created_at) : 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  )
}
