'use client'

import { useState, useRef, useEffect } from 'react'

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function TagInput({
  initTags,
  onChange,
}: {
  initTags: string[]
  onChange: (tags: string[]) => void
}) {
  const [tags, setTags] = useState(initTags)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [similarTags, setSimilarTags] = useState<
    { name: string; articles: number; users: number }[]
  >([])
  const [loading, setLoading] = useState(false)

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      const newTags = [...tags, tag]
      setTags(newTags)
      onChange(newTags)
    }
  }

  const fetchTags = async (name: string) => {
    setLoading(true)
    const res = await fetch(`/api/tag?name=${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = res.json()
    data.then((d) => {
      setSimilarTags(d)
      setLoading(false)
    })
  }

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const debouncedSearchTerm = useDebounce(inputValue, 700)

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchTags(debouncedSearchTerm)
    } else {
      setSimilarTags([])
    }
  }, [debouncedSearchTerm])

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addTag(inputValue)
      setInputValue('')
    } else if (event.key === 'Backspace' && !inputValue) {
      const newTags = tags.slice(0, -1)
      setTags(newTags)
      onChange(newTags)
    }
  }

  const handleGroupClick = () => {
    inputRef.current?.focus()
  }

  return (
    <>
      <div
        className="group flex w-full flex-wrap gap-2 rounded-md border-0 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6"
        onClick={handleGroupClick}
      >
        <input type="hidden" name="tags" value={tags} />
        {tags.map((tag) => (
          <div
            key={tag}
            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100"
          >
            {tag}
            <button
              type="button"
              className="ml-1.5 inline-flex flex-shrink-0 text-gray-400 focus:text-gray-500 focus:outline-none"
              onClick={(event) => {
                event.stopPropagation()
                const newTags = tags.filter((t) => t !== tag)
                setTags(newTags)
                onChange(newTags)
              }}
            >
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth={1.5} d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </div>
        ))}
        {tags.length < 5 && (
          <input
            ref={inputRef}
            type="text"
            name="tag_input"
            id="tag_input"
            className="block flex-1 border-gray-300 bg-transparent text-sm focus:outline-none"
            placeholder="タグを追加"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
        )}
        <div className="text-sm text-gray-500">{`${tags.length}/5`}</div>
      </div>
      <div className="mt-2">
        <div className="text-sm font-bold text-gray-900 dark:text-gray-100">類似タグ</div>
        {loading && <div>検索中…</div>}
        {similarTags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {similarTags.map((tag) => (
              <button
                key={tag.name}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                onClick={async (e) => {
                  e.preventDefault()
                  addTag(tag.name)
                  setInputValue('')
                  setSimilarTags([])
                }}
              >
                {tag.name}
                <span className="ml-1 text-xs text-gray-400">
                  {tag.articles} articles, {tag.users} users
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
