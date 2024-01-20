import Link from 'next/link'

export default function Tag({ name }: { name: string }) {
  const encodedSearchWord = encodeURIComponent(name)
  return (
    <Link
      href={`/search?q=${encodedSearchWord}`}
      className="group z-10 inline-flex cursor-pointer items-center gap-x-1 rounded-full border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
    >
      <p className=" text-slate-400" aria-hidden="true">
        #
      </p>
      <p
        className="overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:underline"
        style={{ maxWidth: '8ch' }}
      >
        {name}
      </p>
    </Link>
  )
}
