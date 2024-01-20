'use client'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Link from 'next/link'
import Image from 'next/image'

import { signIn } from 'next-auth/react'

import SearchBar from './SearchBar'
import { PostBtn, PostBtnMB } from './PostBtn'
import { usePathname, useSearchParams } from 'next/navigation'

let navigation = [
  { name: 'Articles', href: '/', current: true },
  { name: 'Works', href: '/works', current: false },
  // { name: 'Admin', href: '/admin', current: false },
]

export default function Header({ session }: { session: any }) {
  const pathname = usePathname()
  navigation.map((item) => {
    item.current = item.href === pathname
  })
  const user = session?.user
  const userNavigation = [
    { name: 'Your Profile', href: `/${user?.name}` },
    { name: 'Sign out', href: '/api/auth/signout' },
  ]
  const isEditPage = pathname.match(/\/articles\/.+\/edit/) || pathname.match(/\/works\/.+\/edit/)
  return (
    <>
      <header className="sticky top-0 z-50 min-h-full border-b shadow-sm dark:border-gray-700">
        <Disclosure as="nav" className="bg-slate-50 dark:bg-gray-900">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link href="/">
                        <Image
                          className="h-8 w-8"
                          src="/Linkmonoicon.png"
                          alt="Our Product"
                          width={128}
                          height={128}
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`${
                              item.current
                                ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white '
                                : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                            } rounded-md px-3 py-2 text-sm font-medium`}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-3 flex items-center md:ml-6">
                      {pathname !== '/search' && <SearchBar />}
                      {session && (
                        <>
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-200 text-sm ring-offset-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-gray-800 dark:focus:ring-white dark:focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <Image
                                  className="h-8 w-8 rounded-full"
                                  src={user?.image || ''}
                                  alt="your avater image"
                                  width={128}
                                  height={128}
                                />
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
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="block break-words border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
                                  <span>@{user?.name || 'unknown'}</span> <br />
                                  <span className="text-xs text-gray-400">
                                    {user?.email || 'unknown@horizon.com'}
                                  </span>
                                  <br />
                                </div>
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        href={item.href}
                                        className={`${active ? 'bg-gray-100' : ''} ${
                                          item.name === 'Sign out'
                                            ? 'text-red-600'
                                            : 'text-gray-700'
                                        } block px-4 py-2 text-sm`}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                          {!isEditPage && <PostBtn />}
                        </>
                      )}
                      {!session && (
                        <button
                          onClick={() => signIn()}
                          className="item-center ml-3 rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Sign in <span aria-hidden="true">&rarr;</span>
                        </button>
                      )}
                    </div>
                  </div>
                  {/* モバイル用メニュー表示ボタン */}
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="hover:text-gray relative inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-white dark:focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              {/* モバイル用メニュー */}
              <Disclosure.Panel className="md:hidden">
                {pathname !== '/search' && (
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    <SearchBar />
                  </div>
                )}
                <div className="space-y-1 border-b border-gray-300 px-2 py-3 dark:border-gray-700 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={`${
                        item.current
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'
                          : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      } block rounded-md px-3 py-2 text-base font-medium`}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                {session && (
                  <>
                    {!isEditPage && (
                      <div className="space-y-1 border-b border-gray-300 px-2 py-3 dark:border-gray-700 sm:px-3">
                        <PostBtnMB />
                      </div>
                    )}
                    <div className="py-3">
                      <div className="mt-4 flex items-center px-5">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={user?.image || ''}
                            alt="your avater image"
                            width={128}
                            height={128}
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-gray-900 dark:text-white">
                            @{user?.name || 'unknown'}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-600 dark:text-gray-400">
                            {user?.email || 'unknown@horizon.com'}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={`${
                              item.name === 'Sign out'
                                ? 'text-red-400 hover:text-red-300 dark:text-red-400 dark:hover:text-red-300'
                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-50 dark:hover:text-white'
                            } block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 dark:hover:bg-gray-700`}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {!session && (
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    <Disclosure.Button
                      as="a"
                      onClick={() => signIn()}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Sign in
                    </Disclosure.Button>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </header>
    </>
  )
}
