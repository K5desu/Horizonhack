import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import Inner from '@/components/Inner'
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
