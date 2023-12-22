import Image from 'next/image'
import Tag from '../Tag'

interface WorkProps {
  id: string
  title: string | null
  url: string | null
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

export default function WorkCard({ data }: { data?: WorkProps }) {
  return (
    <div className="relative flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <a href="33" tabIndex={-1} className="absolute inset-0" />
      <div className="relative">
        <span className="absolute -inset-0.5" />
        <Image
          width={512}
          height={512}
          className="w-full h-auto max-h-48 rounded-t-xl object-cover"
          src="/test-image-unsplash.jpg"
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
        <div className="flex flex-wrap mt-2">
          <Tag name="Tag" />
        </div>
        <div className="flex flex-wrap justify-between mt-2">
          <a href="#" className="relative text-xs text-gray-500 dark:text-gray-400 hover:underline">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              src="/test-image-unsplash.jpg"
              alt="your avater image"
              width={128}
              height={128}
            />
          </a>
          <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
            {data?.created_at.toLocaleDateString()
              ? data.created_at.toLocaleDateString()
              : 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  )
}
