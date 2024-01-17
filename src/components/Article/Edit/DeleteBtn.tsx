'use client'

import { DeleteArticle } from '@/app/api/article/deleteArticle'

export default function ArticleDeleteBtn({ id }: { id: string }) {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault()
        await DeleteArticle(id)
      }}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      削除
    </button>
  )
}
