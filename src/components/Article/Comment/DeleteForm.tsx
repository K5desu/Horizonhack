'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteComment } from '@/app/api/article/CommentActions'

const initialState = {
  message: '',
  id: '',
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={`py-1 px-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 transition-all duration-200 overflow-hidden whitespace-nowrap`}
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
