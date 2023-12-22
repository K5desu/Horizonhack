import Inner from '@/components/Inner'
import WorkCard from '@/components/Works/WorkCard'
import { All } from '@/app/api/works/getAllWork'

export default async function AllFilesPage() {
  const blobs = await All()

  return (
    <>
      <Inner>
        <header>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-50">Works</h2>
        </header>
        <h3 className="text-xl mt-4 font-bold text-gray-800 dark:text-gray-50">最新</h3>
        <main className="my-3 grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {blobs != 'error' && blobs.map((blob) => <WorkCard key={blob.url} data={blob} />)}
        </main>
      </Inner>
    </>
  )
}
