import Image from 'next/image'
import TimeAgo from '@/components/TimeAgo'
import Link from 'next/link'

interface WorkProps {
  id: string
  title: string | null
  description: string | null
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
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg border bg-gray-50 shadow-none transition hover:shadow-md dark:border-gray-700 dark:bg-slate-900 dark:shadow-slate-700/[.7]">
      <div className="relative flex h-fit bg-gray-200 dark:bg-slate-800 ">
        <span className="absolute -inset-0.5" />
        <Image
          width={512}
          height={512}
          className="h-56 w-full object-cover"
          src={data?.img ?? '/test-image-unsplash.jpg'}
          alt="Work image"
        />
      </div>
      <div className="flex flex-col p-4 md:p-5">
        <h3 className="flex text-lg font-bold text-gray-800 dark:text-white">
          <Link
            href={data?.url ?? ''}
            className="z-10 no-underline underline-offset-1 hover:underline"
          >
            {data?.title ? data.title : 'Untitled'}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {data?.description ? data.description : 'No description'}
        </p>

        <div className="mt-2 flex flex-wrap justify-between">
          <Link
            href={`/${data.author.name}` ?? ''}
            className="relative z-10 flex items-center gap-x-2 text-xs text-gray-500 hover:underline dark:text-gray-400"
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
            <p className="text-md z-10 mt-1 flex text-gray-500 hover:underline dark:text-gray-400">
              @{data?.author.name ? data.author.name : 'Unknown'}
            </p>
          </Link>
          <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
            <TimeAgo date={data.created_at} />
          </p>
        </div>
      </div>
      <a
        href={data?.url ?? ''}
        tabIndex={-1}
        className="absolute inset-0"
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  )
}
