import Link from 'next/link'

export default function UserWorksPage({ params }: { params: { username: string } }) {
  return (
    <>
      <Link href={`../${params.username}`}>戻る</Link> <br />
      <h1>User Works</h1>
      <p>説明：ユーザーの記事リストのページ</p>
      <p>{params.username} / works /</p> <br />
      <p>リンク例</p>
      <Link href={`./works/1`}>./works/1</Link> <br />
      <Link href={`./works/2`}>./works/2</Link>
    </>
  )
}
