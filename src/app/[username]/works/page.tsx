'use server'
import Link from 'next/link'
import { All } from '@/app/api/user_works/getuserwork'
import { getServerSession } from 'next-auth'

export default async function UserWorksPage({ params }: { params: { username: string } }) {
  const Allwork = await All(params.username)

  const session = await getServerSession()

  return (
    <>
      <Link href={`../${params.username}`}>戻る</Link> <br />
      <h1>User Works</h1>
      <p>説明：ユーザーの成果物リストのページ</p>
      <p>{params.username} / works /</p> <br />
      <p>リンク例</p>
      {Allwork != 'No works' &&
        Allwork.work.map((work) => (
          <div key={work.url}>
            {work.url && (
              <>
                <Link href={work.url}>{work.img && <img src={work.img} alt="Notfound"></img>}</Link>
                {work.authorId == session?.user.id && (
                  <Link href={`../../works/${work.id}/edit`}>編集する</Link>
                )}
              </>
            )}
          </div>
        ))}
    </>
  )
}
