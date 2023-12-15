import Link from 'next/link'

export default function ArticlesIdEditPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Link href={`/articles/${params.id}`}>戻る</Link> <br />
      <h1>Articles Id Edit</h1>
      <p>説明：記事の新規作成 || 編集ページ</p>
      <p>{params.id} / edit /</p> <br />
    </>
  )
}
