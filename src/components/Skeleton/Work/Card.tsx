export function SkeletonWorkCard() {
  return (
    <div className="mx-auto flex h-full w-full max-w-md animate-pulse flex-col overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
      <div className="h-auto p-4  md:p-4">
        <h1 className="h-6 w-40 rounded-lg bg-gray-200 dark:bg-gray-700"></h1>

        <div className="mt-6 flex items-end justify-between">
          <div className="flex items-center">
            <h1 className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></h1>
            <div className="ml-2 h-3 w-20 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <div className="h-2 w-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  )
}
