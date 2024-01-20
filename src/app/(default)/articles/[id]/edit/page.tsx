import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import Inner from '@/components/Inner'
import ArticleEditForm from '@/components/Article/Edit/Form'

export default async function ArticlesIdEditPage({ params }: { params: { id: string } }) {
  const session = await getServerSession()
  let article = null
  const articleId = params.id
  try {
    article = await prisma.article.findUniqueOrThrow({
      where: {
        id: articleId,
      },
      select: {
        id: true,
        title: true,
        body: true,
        created_at: true,
        updated_at: true,
        visibility: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  } catch (error) {
    return notFound()
  }

  if (!session || session.user.name !== article.author.name) {
    return forbidden()
  }

  return (
    <>
      <Inner>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Edit Article</h2>
        <ArticleEditForm article={article} />
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
