// pagination.tsx
interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, onPageChange }: PaginationProps) {
  // Function to handle page navigation
  const navigateToPage = (page: number) => {
    onPageChange(page)
  }

  return (
    <div className="flex">
      {/* Previous page button */}
      <a
        href="#"
        onClick={() => navigateToPage(currentPage - 1)}
        className={`flex items-center justify-center px-4 py-2 mx-1 ${
          currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-blue-500'
        } capitalize bg-white rounded-md dark:bg-gray-800 dark:text-gray-600`}
      >
        {/* ... (previous page icon) */}
      </a>

      {/* Page buttons */}
      {/* Map through your pages and render the appropriate links */}
      {/* Example shows three pages, adjust as needed */}
      {[1, 2, 3].map((page) => (
        <a
          key={page}
          href="#"
          onClick={() => navigateToPage(page)}
          className={`px-4 py-2 mx-1 ${
            currentPage === page
              ? 'text-white bg-blue-500'
              : 'text-gray-700 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
          } transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200`}
        >
          {page}
        </a>
      ))}

      {/* Next page button */}
      <a
        href="#"
        onClick={() => navigateToPage(currentPage + 1)}
        className="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
      >
        {/* ... (next page icon) */}
      </a>
    </div>
  )
}
