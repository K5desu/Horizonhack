import Link from 'next/link'
import { All } from './works/getuserwork'
export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const Allwork = await All(params.username)
  let Workcount
  if (Allwork != 'No works') {
    Workcount = Allwork.work.length
  }

  return (
    <>
      <Link href={`/`}>戻る</Link> <br />
      <h1>User Profile</h1>
      <p>説明：ユーザーのプロフィールページ</p>
      <p>成果物の個数は{Workcount}です</p>
      <p>{params.username}</p> <br />
      <p>リンク例</p>
      <Link href={`${params.username}/articles`}>./articles</Link> <br />
      <Link href={`${params.username}/works`}>./works</Link>
    </>
  )
}
