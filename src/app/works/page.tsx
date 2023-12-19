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
                {blob.img && <img src={blob.img} alt="Notfound"></img>} {blob.author.name}-
              </Link>
            )}
          </div>
        ))}
    </div>
  )
}
