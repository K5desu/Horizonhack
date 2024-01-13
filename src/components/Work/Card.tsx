import Image from 'next/image'
import TimeAgo from '@/components/TimeAgo'
import Link from 'next/link'

interface WorkProps {
  id: string
  title: string | null
  url: string | null
  img: string | null
  created_at: Date
  author: {
    name: string | null
    image: string | null
  }
}

export default function WorkCard({ data }: { data: WorkProps }) {
  return (
    <div className="relative flex flex-col bg-gray-50 overflow-hidden border shadow-none hover:shadow-md rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] transition">
      <a
        href={data?.url ?? ''}
        tabIndex={-1}
        className="absolute inset-0 z-10"
        target="_blank"
        rel="noopener noreferrer"
      />
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
          {data?.title ? data.title : 'Untitled'}
        </h3>
        <p className="text-md mt-1 text-gray-500 dark:text-gray-400">
          {data?.author.name ? data.author.name : 'Unknown'}
        </p>

        <div className="flex flex-wrap justify-between mt-2">
          <Link
            href={`/${data.author.name}` ?? ''}
            className="relative text-xs text-gray-500 dark:text-gray-400 hover:underline"
          >
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              src={data?.author.image ?? '/test-image-unsplash.jpg'}
              alt="your avater image"
              width={128}
              height={128}
            />
          </Link>
          <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
            <TimeAgo date={data.created_at} />
          </p>
        </div>
      </div>
    </div>
  )
}
