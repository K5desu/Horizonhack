'use client'

import { DeleteArticle } from '@/app/api/userarticle/DeleteArticle'

export default function ArticleDeleteBtn(id: any) {
  return (
    <button
      onClick={async (e) => {
        e.preventDefault()
        await DeleteArticle(id)
      }}
      className=""
    >
      削除
    </button>
  )
}
