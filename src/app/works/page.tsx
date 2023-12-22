import Inner from '@/components/Inner'
import WorkCard from '@/components/Works/WorkCard'
import Link from 'next/link'
import { All } from '@/app/api/works/getAllWork'

export default async function AllFilesPage() {
  const blobs = await All()

  return (
    <>
      <div>
        {blobs != 'error' &&
          blobs.map((blob) => (
            <div key={blob.url}>
              {blob.url && (
                <Link href={blob.url}>
                  <h1>タイトル:{blob.title}</h1>
                  <p>作成者:{blob.author.name}</p>
                  {blob.img && <img src={blob.img} alt="Notfound"></img>}
                </Link>
              )}
            </div>
          ))}
      </div>

      <Inner>
        <header>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-50">Works</h2>
        </header>
        <h3 className="text-xl mt-4 font-bold text-gray-800 dark:text-gray-50">最新</h3>
        <main className="my-3 grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <WorkCard />
          <WorkCard />
          <WorkCard />
          <WorkCard />
          <WorkCard />
          <WorkCard />
          <WorkCard />
          <WorkCard />
          <WorkCard />
        </main>
      </Inner>
    </>
  )
}
