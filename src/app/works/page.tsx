import Link from 'next/link'
import { All } from '@/app/api/works/getAllWork'

export default async function AllFilesPage() {
  const blobs = await All()

  return (
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
  )
}
