'use client'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Link from 'next/link'
import Image from 'next/image'

import { signIn } from 'next-auth/react'

import SearchBar from './SearchBar'
import PostBtn from './PostBtn'
import { usePathname } from 'next/navigation'

let navigation = [
  { name: 'Articles', href: '/', current: true },
  { name: 'Works', href: '/works', current: false },
  { name: 'Admin', href: '/admin', current: false },
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
  return (
    <>
      <header className="min-h-full sticky top-0 z-50">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`
                            ${
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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
                      <SearchBar />
                      {session && (
                        <>
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                                <div className="block break-words px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-200">
                                  <span>@ {user?.name || 'unknown'}</span> <br />
                                  <span className="text-xs text-gray-400">
                                    {user?.email || 'unknown@horizon.com'}
                                  </span>
                                  <br />
                                </div>
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        className={`${active ? 'bg-gray-100' : ''} ${
                                          item.name === 'Sign out' ? 'text-red-600' : ''
                                        } block px-4 py-2 text-sm text-gray-700`}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                          <PostBtn />
                        </>
                      )}
                      {!session && (
                        <button
                          onClick={() => signIn()}
                          className="text-sm ml-3 font-semibold leading-6 item-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
                        >
                          Sign in <span aria-hidden="true">&rarr;</span>
                        </button>
                      )}
                    </div>
                  </div>
                  {/* モバイル用メニュー表示ボタン */}
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  <SearchBar />
                </div>
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={`${
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } block rounded-md px-3 py-2 text-base font-medium
                      `}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
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
                      <div className="text-base font-medium leading-none text-white">
                        @{user?.name || 'unknown'}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
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
                          item.name === 'Sign out' ? 'text-red-400 hover:text-red-300' : ''
                        } block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white`}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </header>
    </>
  )
}
