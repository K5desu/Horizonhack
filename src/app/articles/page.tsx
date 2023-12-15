import Link from 'next/link'

export default function ArticlesPage() {
  return (
    <>
      <Link href={`./`}>戻る</Link> <br />
      <h1>Articles</h1>
      <p>説明：記事の一覧ページ</p>
      <p>リンク例</p>
      <Link href={`./hoge`}>./[username]</Link> <br />
      <Link href={`./hoge/articles/1`}>./[username]/articles/[1]</Link> <br />
    </>
  )
}
