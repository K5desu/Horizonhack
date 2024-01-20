import Link from 'next/link'

export function AnounceGuideLine() {
  return (
    <div className="flex flex-wrap items-center text-sm text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>

      <Link
        href="/docs/guideline"
        className="mx-2 leading-6 text-blue-400 underline hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
        target="_blank"
      >
        コミュニティガイドライン
      </Link>
      <span>をお読みください</span>
    </div>
  )
}
