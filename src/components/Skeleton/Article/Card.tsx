export function SkeletonArticleCard() {
  return (
    <div className="flex flex-col gap-2 w-full p-4 overflow-hidden bg-gray-50 rounded-lg animate-pulse dark:bg-gray-800">
      <div className="w-40 h-7 bg-gray-200 rounded-full dark:bg-gray-700"></div>

      <div className="flex justify-between mt-2 items-end">
        <div className="flex items-center gap-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-20 dark:bg-gray-700"></div>
        </div>

        <div className="h-4 bg-gray-200 rounded-lg w-10 dark:bg-gray-700"></div>
      </div>
    </div>
  )
}
