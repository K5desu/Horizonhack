'use server'
import Link from 'next/link'
import { Allw } from '@/app/api/user_works/getuserwork'
import { getServerSession } from 'next-auth'
import { userId } from '@/app/api/user_works/getuserId'
export default async function UserWorksPage({ params }: { params: { username: string } }) {
  let authorId: any
  const session = await getServerSession()
  if (session?.user.email) {
    authorId = await userId(session?.user.email)
  }
  const Allwork = await Allw(authorId.id)

  return (
    <>
      <Link href={`../${params.username}`}>戻る</Link> <br />
      <h1>User Works</h1>
      <p>説明：ユーザーの成果物リストのページ</p>
      <p>{params.username} / works /</p> <br />
      <p>リンク例</p>
      {Allwork != 'No works' &&
        Allwork.map((work) => (
          <div key={work.url}>
            {work.url && (
              <>
                <h1>{work.title}</h1>
                <h2>作成日:{String(work.created_at)}</h2>
                <h2>更新日:{String(work.updated_last)}</h2>
                {work.authorId == authorId.id && (
                  <Link href={`../../works/${work.id}/edit`}>編集する</Link>
                )}
                <Link href={work.url}>{work.img && <img src={work.img} alt="Notfound"></img>}</Link>
              </>
            )}
          </div>
        ))}
    </>
  )
}
