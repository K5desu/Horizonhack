'use client'

import { Fragment } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { Post } from '@/app/api/createpost/create'

const postOptions = [
  { name: '記事を作成', url: 'articles' },
  { name: '成果物を作成', url: 'works' },
]

export function PostBtn() {
  return (
    <Menu as="div" className="relative ml-3 shrink-0">
      <div>
        <Menu.Button className="flex rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <span className="sr-only">Open post menu</span>
          <span>投稿</span>
          <PaperAirplaneIcon className="my-auto -mr-1 ml-1 h-4 w-4" aria-hidden="true" />
        </Menu.Button>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {postOptions.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  onClick={async () => await Post(item.url)}
                  className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                >
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export function PostBtnMB() {
  return (
    <>
      {postOptions.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="button"
          onClick={async () => await Post(item.url)}
          className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </>
  )
}
