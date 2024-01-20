import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import Inner from '@/components/Inner'
import Uploader from '@/components/Work/Edit/uploader'
import WorkEditForm from '@/components/Work/Edit/Form'

export default async function AvatarUploadPage({ params }: { params: { id: string } }) {
  const session = await getServerSession()
  let work = null
  const workId = params.id
  try {
    work = await prisma.work.findUniqueOrThrow({
      where: {
        id: workId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        img: true,
        created_at: true,
        updated_at: true,
        visibility: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })
  } catch (error) {
    return notFound()
  }

  if (!session || session.user.name !== work.author.name) {
    return forbidden()
  }

  return (
    <>
      <Inner>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Edit Work</h2>
        <WorkEditForm work={work} />
        {/* <form
          onSubmit={async (event) => {
            //blobに画像データpost
            event.preventDefault()
            const notfound = await notFounds(String(id))
            if (notfound == 'no') {
              router.push('urlに直打ちしないで/誰ですか？')
              notFound()
            }

            if (!inputFileRef.current?.files) {
              throw new Error('No file selected')
            }

            const file = inputFileRef.current.files[0]

            const response = await fetch(`/api/file?filename=${file.name}`, {
              method: 'POST',
              body: file,
            })

            const newBlob = (await response.json()) as PutBlobResult //挿入した画像のurl帰ってくる

            setBlob(newBlob)
            //url,imgurl,title,を作成時はidで挿入 idはurlから取得
            //この三つの値をpostまたはeditへ
            //urlあるかどうか確認

            //url,imgurl,title,を作成時はidで挿入 idはurlから取得
            //このidはimgid
            if (
              inputTitleRef.current?.value &&
              inputUrlRef.current?.value &&
              newBlob.url &&
              id &&
              inputFileRef.current?.files
            ) {
              await editWork(
                String(id),
                inputTitleRef.current?.value,
                inputUrlRef.current.value,
                newBlob.url
              )
              inputTitleRef.current.value = ''
              inputUrlRef.current.value = ''
              inputFileRef.current.files = null
            }
          }}
        >
          <input name="file" ref={inputFileRef} type="file" required />
          <input
            type="text"
            id="name"
            name="url"
            className="box-border"
            placeholder="urlを貼り付けてください"
            ref={inputUrlRef}
            required
          />
          <input
            type="text"
            id="name"
            name="title"
            className="box-border"
            placeholder="タイトル入力してください"
            required
            ref={inputTitleRef}
          />
          <button type="submit">Upload</button>
        </form>
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )} */}
      </Inner>
    </>
  )
}

function forbidden() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">403</h1>
      <p className="text-md mt-2 text-gray-500">You are not authorized to access this page.</p>
    </div>
  )
}
