'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteWork } from '@/app/api/work/edit/EditActions'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const initialState = {
  message: '',
  id: '',
  username: '',
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <>
      <button
        type="submit"
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
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

  useEffect(() => {
    if (state.message === 'success') {
      toast.success('成果物を削除しました。')
      window.location.href = `/${state.username}`
    } else if (state.message === 'error') {
      toast.error('成果物の削除に失敗しました。')
    }
  }, [state.message, state.username])

  return (
    <form action={formAction}>
      <input type="hidden" name="workId" value={id} />
      <DeleteButton />
    </form>
  )
}
