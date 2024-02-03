'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createComment } from '@/app/api/article/comment/CommentActions'
import { useEffect, useState } from 'react'

const initialState = {
  message: '',
  id: '',
}

function SubmitButton({ isInputFilled }: { isInputFilled: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={`overflow-hidden whitespace-nowrap rounded-lg border py-3 transition-all duration-200 ${
        isInputFilled ? 'visible ml-2 w-auto px-4 opacity-100' : 'invisible ml-0 w-0 px-0 opacity-0'
      } ${
        isInputFilled ? 'bg-sky-700 text-white dark:bg-sky-800' : 'bg-white dark:bg-slate-800'
      } border-gray-300 dark:border-gray-700 dark:text-gray-400`}
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? '送信中...' : '送信'}
    </button>
  )
}

export default function CommentForm({
  articleId,
  articleAuthor,
  authorName,
}: {
  articleId: string
  articleAuthor: string | null
  authorName?: string | null | undefined
}) {
  const [state, formAction] = useFormState(createComment, initialState)
  const [bodyValue, setBodyValue] = useState('')

  useEffect(() => {
    if (state.message === 'success') {
      setBodyValue('')
    }
  }, [state.message, state.id])
  if (!authorName) return null

  return (
    <>
      <form action={formAction} className="mt-4 flex text-sm">
        <input type="hidden" name="articleId" value={articleId} />
        {articleAuthor && <input type="hidden" name="articleAuthor" value={articleAuthor} />}
        <input type="hidden" name="authorName" value={authorName} />
        <input
          type="text"
          name="body"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400"
          placeholder="コメントを入力してください。"
          required
          value={bodyValue}
          onChange={(e) => setBodyValue(e.target.value)}
        />
        <SubmitButton isInputFilled={bodyValue !== ''} />
      </form>
    </>
  )
}
