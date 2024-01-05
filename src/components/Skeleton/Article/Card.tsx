export function SkeletonArticleCard() {
  return (
    <div className="flex w-full max-w-md mx-auto overflow-hidden bg-gray-50 rounded-lg animate-pulse dark:bg-gray-800">
      <div className="w-full p-4  md:p-4">
        <h1 className="w-40 h-6 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

        <div className="flex justify-between mt-6 items-end">
          <div className="flex items-center">
            <h1 className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700"></h1>
            <div className="h-3 ml-2 bg-gray-200 rounded-lg w-20 dark:bg-gray-700"></div>
          </div>

          <div className="h-2 bg-gray-200 rounded-lg w-8 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  )
}
