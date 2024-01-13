import Link from 'next/link'

export default function Tag({ name }: { name: string }) {
  const encodedSearchWord = encodeURIComponent(name)
  return (
    <Link
      href={`/search?q=${encodedSearchWord}`}
      className="inline-flex cursor-pointer items-center z-10 gap-x-1 py-1 px-2 rounded-full text-xs font-medium border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-slate-800 hover:underline"
    >
      {name}
    </Link>
  )
}
