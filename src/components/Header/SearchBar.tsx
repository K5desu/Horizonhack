import { redirect } from 'next/navigation'

export default function SearchBar() {
  const search = async (formData: FormData) => {
    const searchWord = formData.get('search')
    if (!searchWord) return
    const encodedSearchWord = encodeURIComponent(searchWord as string)
    const url = `/search?q=${encodedSearchWord}`
    redirect(url)
  }
  return (
    <form className="relative z-0" action={search}>
      <input
        type="text"
        className="text-md z-10 w-full rounded-md border bg-white py-2 pl-10 pr-4 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200"
        placeholder="検索"
        name="search"
      />
      <div className="absolute left-0 top-[50%] ml-4" style={{ transform: 'translateY(-50%)' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </form>
  )
}
