'use client'

import { Fragment, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { Menu, Transition } from '@headlessui/react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { createPost } from '@/app/api/createpost/CreateAction'

const postOptions = [
  { name: '記事を作成', url: 'articles' },
  { name: '成果物を作成', url: 'works' },
]

const initialState = {
  message: '',
  type: '',
  id: '',
  user: '',
}

function MenuButton({ pending }: { pending?: boolean }) {
  const isButtonDisabled = pending

  return (
    <Menu.Button
      className={`relative flex items-center rounded-md border bg-sky-700 px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 dark:border-gray-700 ${
        isButtonDisabled ? 'hover:bg-sky-700' : ''
      }`}
      disabled={isButtonDisabled}
    >
      <span className="sr-only">Open post menu</span>
      <span>{pending ? '作成中...' : '投稿'}</span>
      <div className="ml-1">
        {pending ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </>
        ) : (
          <>
            <PaperAirplaneIcon className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </div>
    </Menu.Button>
  )
}

export function PostBtn({ isMobile = false }: { isMobile?: boolean }) {
  const [state, formAction] = useFormState(createPost, initialState)
  const [pending, setPending] = useState(false)
  const [type, setType] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.target as HTMLFormElement)
    formData.set('type', type)
    if (type === '') {
      toast.error('想定外のエラーが発生しました')
      return
    }
    formAction(formData)
  }

  useEffect(() => {
    if (state.message === 'overflow') {
      toast.error('下書きの上限です')
      window.location.href = `/${state.user}`
      setPending(false)
      return
    }
    if (state.message === 'error') {
      toast.error('作成に失敗しました')
      setPending(false)
      return
    }
    if (state.message === 'success') {
      toast.success('作成に成功しました')
      window.location.href = `/${state.type}/${state.id}/edit`
      setPending(false)
      return
    }
  }, [state.message, state.type, state.id, state.user])

  return isMobile ? (
    <>
      <form onSubmit={handleSubmit}>
        {pending ? (
          <div className="flex w-full items-center rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white">
            <p>作成中...</p>
            <div className="ml-1">
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        ) : (
          postOptions.map((item) => (
            <button
              key={item.name}
              onClick={() => setType(item.url)}
              className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={pending}
            >
              {item.name}
            </button>
          ))
        )}
      </form>
    </>
  ) : (
    <form onSubmit={handleSubmit}>
      <Menu as="div" className="relative ml-3 shrink-0">
        <div>
          <MenuButton pending={pending} />
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right scale-100 transform rounded-md bg-white py-1 text-left opacity-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {postOptions.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    type="submit"
                    onClick={() => setType(item.url)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </form>
  )
}
