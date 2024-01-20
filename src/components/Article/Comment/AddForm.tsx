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
      className={`py-3 rounded-lg border transition-all duration-200 overflow-hidden whitespace-nowrap ${
        isInputFilled ? 'opacity-100 visible w-auto px-4 ml-2' : 'opacity-0 invisible w-0 px-0 ml-0'
      } ${
        isInputFilled ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'bg-white dark:bg-slate-800'
      } border-gray-300 dark:text-gray-400 dark:border-gray-700`}
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
      <form action={formAction} className="flex mt-4 text-sm">
        <input type="hidden" name="articleId" value={articleId} />
        {articleAuthor && <input type="hidden" name="articleAuthor" value={articleAuthor} />}
        <input type="hidden" name="authorName" value={authorName} />
        <input
          type="text"
          name="body"
          className="px-4 py-3 rounded-lg flex-1 border border-gray-300 dark:text-gray-400 dark:bg-slate-800 dark:border-gray-700"
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
