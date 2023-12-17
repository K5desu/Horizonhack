import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>説明：ホームページ</p>
      <p>リンク例</p>
      <Link href={`./articles`}>./articles</Link> <br />
      <Link href={`./works`}>./works</Link> <br />
    </>
  )
}
