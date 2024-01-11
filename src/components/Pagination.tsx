'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <div className="flex overflow-x-scroll">
      <Link
        href={currentPage !== 1 ? createPageURL(currentPage - 1) : {}}
        className={`flex items-center justify-center px-4 py-2 mx-1 ${
          currentPage === 1
            ? 'text-gray-300 cursor-default dark:text-gray-700'
            : 'text-gray-700 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
        } capitalize bg-gray-100 rounded-md dark:bg-gray-800 `}
      >
        {'<'}
      </Link>

      {allPages.map((page, index) => {
        return (
          <PaginationNumber
            key={page}
            href={createPageURL(page)}
            page={page}
            isActive={page === currentPage}
          />
        )
      })}

      <Link
        href={currentPage !== totalPages ? createPageURL(currentPage + 1) : {}}
        className={`flex items-center justify-center px-4 py-2 mx-1 ${
          currentPage === totalPages
            ? 'text-gray-700 cursor-default dark:text-gray-700'
            : 'text-gray-700 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
        } capitalize bg-gray-100 rounded-md dark:bg-gray-800 `}
      >
        {'>'}
      </Link>
    </div>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string
  href: string
  isActive: boolean
}) {
  const isEllipsis = page === '...'
  const activeClass = `${
    isActive ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-200 dark:bg-gray-800'
  } ${
    isEllipsis
      ? ''
      : 'hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
  }`
  const flag = isEllipsis || isActive
  const className = `px-4 py-2 mx-1 ${activeClass} transition-colors duration-300 transform rounded-md sm:inline`
  return flag ? (
    <span className={className}>{page}</span>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}
