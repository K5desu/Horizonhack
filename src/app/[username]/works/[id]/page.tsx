import Link from 'next/link'

export default function UserWorkPage({ params }: { params: { username: string; id: string } }) {
  return (
    <>
      <Link href={`../works`}>戻る</Link> <br />
      <h1>User Work Detaile</h1>
      <p>説明：成果物の詳細ページ</p>
      <p>
        {params.username} / works / {params.id}
      </p>
    </>
  )
}
