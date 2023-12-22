import Link from 'next/link'
import Inner from '@/components/Inner'
export default function UserWorkPage({ params }: { params: { username: string; id: string } }) {
  return (
    <>
      <Inner>
        <Link href={`../works`}>戻る</Link> <br />
        <h1>User Work Detaile</h1>
        <p>説明：成果物の詳細ページ</p>
        <p>
          {params.username} / works / {params.id}
        </p>
      </Inner>
    </>
  )
}
