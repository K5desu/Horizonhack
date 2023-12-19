export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        className="rounded-md pl-10 pr-4 py-2 w-full bg-white text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900"
        placeholder="Search..."
      />
      <div className="absolute left-0 top-0 mt-3 ml-4">
        <svg
          className="h-4 w-4 fill-current text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 2a8 8 0 0 1 6.32 13.494l5.387 5.387-1.414 1.414-5.387-5.387A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 10 4z" />
        </svg>
      </div>
    </div>
  )
}
