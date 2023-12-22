'use client'
import Link from 'next/link'
import { Answer } from '@/app/api/article/comment'
import { useState } from 'react'

export default function ArticlesPage() {
  return (
    <>
      <Link href={`./`}>戻る</Link> <br />
      <h1>Articles</h1>
      <p>説明：記事の一覧ページ</p>
      <Link href="/articles/comment">コメントする</Link>
      <p>リンク例</p>
      <Link href={`./hoge`}>./[username]</Link> <br />
      <Link href={`./hoge/articles/1`}>./[username]/articles/[1]</Link> <br />
    </>
  )
}
