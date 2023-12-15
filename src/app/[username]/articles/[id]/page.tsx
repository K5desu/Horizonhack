import Link from 'next/link'

export default function UserArticlePage({ params }: { params: { username: string; id: string } }) {
  return (
    <>
      <Link href={`../articles`}>戻る</Link> <br />
      <h1>User Article Detaile</h1>
      <p>説明：記事の詳細ページ</p>
      <p>
        {params.username} / article / {params.id}
      </p>
    </>
  )
}
