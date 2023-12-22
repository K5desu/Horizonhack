'use client'
import Link from 'next/link'
import { Answer } from '@/app/api/article/comment'
import { useState } from 'react'

export default function ArticlesPage() {
  const [comment, setComment] = useState<string>('')
  const change = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  return (
    <>
      <Link href={`./`}>戻る</Link> <br />
      <h1>Articles</h1>
      <p>説明：記事の一覧ページ</p>
      <p>リンク例</p>
      <Link href={`./hoge`}>./[username]</Link> <br />
      <Link href={`./hoge/articles/1`}>./[username]/articles/[1]</Link> <br />
      <form onSubmit={() => Answer(comment, 'clqf44ycv0000k8aj62xgeibl')}>
        <textarea
          className="border-black border-double border-2 border-black"
          name="otoiawase"
          placeholder="コメント入れてください"
          rows={5}
          cols={40}
          onChange={change}
          required
          value={comment}
        ></textarea>
        <button type="submit" className="text-red-500 border-4">
          コメントする
        </button>
      </form>
    </>
  )
}
