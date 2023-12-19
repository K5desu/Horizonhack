export default function Tag({ name }: { name: string }) {
  return (
    <span className="inline-flex cursor-pointer items-center z-10 gap-x-1 py-1 px-2 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-slate-800">
      {name}
    </span>
  )
}
