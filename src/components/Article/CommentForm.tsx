import getUserId from '@/app/api/user/getUserId'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function CommentForm({
  articleId,
  authorName,
}: {
  articleId: string
  authorName?: string | null | undefined
}) {
  if (!authorName) {
    return null
  }

  const authorId = await getUserId(authorName as string)
  if (!authorId) {
    return null
  }

  async function postComment(formData: FormData) {
    'use server'
    const rawFormData = {
      articleId: formData.get('articleId') as string,
      authorName: formData.get('authorName') as string,
      body: formData.get('body') as string,
    }
    try {
      const comment = await prisma.comment.create({
        data: {
          body: rawFormData.body as string,
          author: {
            connect: {
              id: authorId,
            },
          },
          article: {
            connect: {
              id: rawFormData.articleId as string,
            },
          },
        },
      })
      return redirect(`/articles/${rawFormData.articleId}`)
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <form action={postComment} className="flex mt-4">
      <input type="hidden" name="articleId" value={articleId} />
      <input type="hidden" name="authorName" value={authorName} />
      <input
        type="text"
        name="body"
        className="py-3 px-4 block border w-full border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="Comment input"
        required
      />
      <input
        type="submit"
        className="text-gray-500 dark:text-gray-400 ml-2 py-3 px-4 block border rounded-lg border-gray-300"
      />
    </form>
  )
}
