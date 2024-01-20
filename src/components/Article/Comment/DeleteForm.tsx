'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteComment } from '@/app/api/article/comment/CommentActions'

const initialState = {
  message: '',
  id: '',
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={`overflow-hidden whitespace-nowrap rounded-lg border border-gray-300 bg-white px-2 py-1 transition-all duration-200 dark:border-gray-700 dark:bg-slate-800`}
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? '削除中...' : '削除'}
    </button>
  )
}

export default function DeleteCommentForm({
  articleId,
  commentId,
  authorName,
}: {
  articleId: string
  commentId: string
  authorName?: string | null | undefined
}) {
  const [state, formAction] = useFormState(deleteComment, initialState)

  if (!authorName) return null

  return (
    <>
      <form action={formAction} className="flex text-sm">
        <input type="hidden" name="articleId" value={articleId} />
        <input type="hidden" name="commentId" value={commentId} />
        <input type="hidden" name="authorName" value={authorName} />
        <DeleteButton />
      </form>
    </>
  )
}
