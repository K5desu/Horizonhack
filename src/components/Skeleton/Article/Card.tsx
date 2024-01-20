export function SkeletonArticleCard() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-2 overflow-hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      <div className="h-7 w-40 rounded-full bg-gray-200 dark:bg-gray-700"></div>

      <div className="mt-2 flex items-end justify-between">
        <div className="flex items-center gap-x-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-20 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <div className="h-4 w-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  )
}
