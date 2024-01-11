'use client'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, useState } from 'react'

export default function SortBtn({ sort }: { sort: 'new' | 'old' | undefined }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sorts = [
    {
      id: 1,
      name: 'new',
    },
    {
      id: 2,
      name: 'old',
    },
  ]

  const createSortURL = (sort: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', String(sort))
    return `${pathname}?${params.toString()}`
  }

  const [selectedSort, setSelectedSort] = useState(sort === 'new' ? sorts[0] : sorts[1])
  return (
    <Listbox value={selectedSort} onChange={setSelectedSort}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selectedSort.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {sorts.map((sort) => (
                  <Listbox.Option
                    key={sort.id}
                    className={({ active }) =>
                      `${
                        active && selectedSort.name !== sort.name
                          ? 'text-blue-900 bg-blue-100'
                          : 'text-gray-900'
                      } ${
                        selectedSort.name === sort.name ? 'cursor-default' : 'cursor-pointer'
                      } select-none relative py-2 pl-3 pr-9`
                    }
                    value={sort}
                    onClick={(e) => {
                      if (selectedSort.name !== sort.name) {
                        setSelectedSort(sort)
                        window.location.href = createSortURL(sort.name)
                      } else {
                        e.preventDefault()
                      }
                    }}
                  >
                    {sort.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
