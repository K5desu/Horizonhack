import Link from 'next/link'

export default function UserProfilePage({ params }: { params: { username: string } }) {
  return (
    <>
      <Link href={`/`}>戻る</Link> <br />
      <h1>User Profile</h1>
      <p>説明：ユーザーのプロフィールページ</p>
      <p>{params.username}</p> <br />
      <p>リンク例</p>
      <Link href={`${params.username}/articles`}>./articles</Link> <br />
      <Link href={`${params.username}/works`}>./works</Link>
    </>
  )
}
