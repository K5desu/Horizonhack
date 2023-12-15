import { put, del } from '@vercel/blob'
import { head } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const fileurl = searchParams.get('url')

  if (fileurl) {
    const blobDetails = await head(fileurl)
    return Response.json(blobDetails)
  } else {
    return NextResponse.json({ message: 'Nourl' })
  }
}

export async function DELETE(request: Request) {
  const json = await request.json()
  console.log({ json })
  await del(json.url)

  return NextResponse.json({})
}

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename') || ''

  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: 'public',
    })
    /*
  pathname: `string`,
  contentType: `string`,
  contentDisposition: `string`,
  url: `string`
*/

    return NextResponse.json(blob)
  } else {
    return NextResponse.json({ message: 'Nofile' })
  }
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
