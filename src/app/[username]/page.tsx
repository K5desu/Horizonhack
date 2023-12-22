import Link from 'next/link'
import { Allw } from '@/app/api/user_works/getuserwork'
import { Alla } from '@/app/api/userarticle/getuserarticle'
import { userId } from '@/app/api/user_works/getuserId'
import { getServerSession } from 'next-auth'
export default async function UserProfilePage({ params }: { params: { username: string } }) {
  let authorId: any
  const session = await getServerSession()
  if (session?.user.email) {
    authorId = await userId(session?.user.email)
  }
  const Allarticle = await Alla(authorId.id)
  let articlecount: number = 0

  if (Allarticle != 'No works') {
    articlecount = Allarticle.length
  }

  const Allwork = await Allw(authorId.id)
  let Workcount: number = 0

  if (Allwork != 'No works') {
    Workcount = Allwork.length
  }

  return (
    <>
      <Link href={`/`}>戻る</Link> <br />
      <h1>User Profile</h1>
      <p>説明：ユーザーのプロフィールページ</p>
      <p>記事の個数は{articlecount}です</p>
      <p>成果物の個数は{Workcount}です</p>
      <p>{params.username}</p> <br />
      <p>リンク例</p>
      <Link href={`${params.username}/articles`}>./articles</Link> <br />
      <Link href={`${params.username}/works`}>./works</Link>
    </>
  )
}
