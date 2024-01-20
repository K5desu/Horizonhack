'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteWork } from '@/app/api/work/edit/EditActions'

const initialState = {
  message: '',
  id: '',
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500"
        aria-disabled={pending}
        disabled={pending}
      >
        {pending ? '削除中...' : '削除する'}
      </button>
    </>
  )
}

export default function DeleteForm({ id }: { id: string }) {
  const [state, formAction] = useFormState(deleteWork, initialState)

  if (state.message === 'success') {
    window.location.href = '/'
  }
  return (
    <form action={formAction}>
      <input type="hidden" name="workId" value={id} />
      <DeleteButton />
      <p>
        {state.message === 'success' && (
          <span className="text-sm text-gray-500">成果物を削除しました。</span>
        )}
        {state.message === 'error' && (
          <span className="text-sm text-red-500">成果物の削除に失敗しました。</span>
        )}
      </p>
    </form>
  )
}
