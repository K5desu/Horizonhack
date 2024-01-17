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
    <form className="relative" action={search}>
      <input
        type="text"
        className="rounded-md pl-10 pr-4 py-2 w-full dark:text-gray-200 bg-white dark:bg-slate-800 text-sm placeholder-gray-400 focus:outline-none"
        placeholder="検索"
        name="search"
      />
      <div className="absolute left-0 top-0 mt-[0.7rem] ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 text-gray-600"
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
