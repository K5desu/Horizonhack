import Link from 'next/link'

export default function UserArticlesPage({ params }: { params: { username: string } }) {
  return (
    <>
      <Link href={`../${params.username}`}>戻る</Link> <br />
      <h1>User Articles</h1>
      <p>説明：ユーザーの記事リストのページ</p>
      <p>{params.username} / articles /</p> <br />
      <p>リンク例</p>
      <Link href={`./articles/1`}>./articles/1</Link> <br />
      <Link href={`./articles/2`}>./articles/2</Link>
    </>
  )
}
