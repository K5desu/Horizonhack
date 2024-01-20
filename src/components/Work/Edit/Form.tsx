'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { updateWork } from '@/app/api/work/edit/EditActions'
import { useEffect, useState } from 'react'
import { AnounceGuideLine } from '@/components/Anounce'
import Link from 'next/link'
import DeleteForm from '@/components/Work/Edit/DeleteForm'
import ImageInput from './ImageInput'
import { PutBlobResult } from '@vercel/blob'
import toast from 'react-hot-toast'
import TimeAgo from '@/components/TimeAgo'

function SubmitButton({
  isInputFilled,
  visibility,
  isFetching,
}: {
  isInputFilled: boolean
  visibility: boolean
  isFetching: boolean
}) {
  const { pending } = useFormStatus()

  const isButtonDisabled = pending || !isInputFilled
  const buttonColor = visibility
    ? 'bg-green-600 hover:bg-green-500'
    : 'bg-gray-600 hover:bg-gray-500'
  const buttonHoverDisabled = visibility ? 'hover:bg-green-600' : 'hover:bg-gray-600'

  return (
    <button
      type="submit"
      className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${buttonColor} ${
        isButtonDisabled || isFetching ? `opacity-30 ${buttonHoverDisabled}` : ''
      }`}
      aria-disabled={isButtonDisabled || isFetching}
      disabled={isButtonDisabled || isFetching}
    >
      {pending || isFetching ? '更新中...' : `更新 | ${visibility ? '公開' : 'プライベート'}`}
    </button>
  )
}

interface Work {
  id: string
  title: string | null
  description: string | null
  url: string | null
  img: string | null
  visibility: boolean | null
  created_at: Date
  updated_at: Date
  author: {
    name: string | null
    image: string | null
  }
}

const initialState = {
  message: '',
  id: '',
}

export default function WorkEditForm({ work }: { work: Work }) {
  const [state, formAction] = useFormState(updateWork, initialState)
  const workId = work.id

  const initialTitle = work.title || ''
  const initialDescription = work.description || ''
  const initialUrl = work.url || ''
  const initialImg = work.img || ''
  const initialVisibility = work.visibility || false

  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [url, setUrl] = useState(initialUrl)
  const [img, setImg] = useState(new File([], ''))
  const [visibility, setVisibility] = useState(initialVisibility)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (
      title === initialTitle &&
      description === initialDescription &&
      url === initialUrl &&
      img.name === '' &&
      visibility === initialVisibility
    ) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  }, [
    title,
    description,
    url,
    img,
    visibility,
    initialTitle,
    initialDescription,
    initialUrl,
    initialImg,
    initialVisibility,
  ])

  useEffect(() => {
    if (state.message === 'success') {
      toast.success('更新に成功しました')
    } else if (state.message === 'error') {
      toast.error('更新に失敗しました')
    }
  }, [state.message])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // 送信前処理を以下に記述
    if (img.name !== '') {
      setIsFetching(true)
      fetch('/api/upload', {
        method: 'POST',
        headers: {
          'content-type': img?.type || 'application/octet-stream',
          'initial-image': initialImg,
        },
        body: img as File,
      }).then(async (res) => {
        if (res.status === 200) {
          const { url } = (await res.json()) as PutBlobResult
          const formData = new FormData(event.target as HTMLFormElement)
          formData.set('img', url)
          formAction(formData)
        } else {
          const error = await res.text()
          toast.error(error)
        }
        setIsFetching(false)
        setImg(new File([], ''))
      })
    } else {
      const formData = new FormData(event.target as HTMLFormElement)
      formData.set('img', initialImg)
      formAction(formData)
      // setIsButtonDisabled(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <input type="hidden" name="workId" value={workId} />
          <div className="border-b border-gray-900/10 dark:border-gray-200/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-md font-semibold leading-6 text-gray-900 dark:text-gray-100"
                >
                  タイトル {'(必須)'}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="input_title"
                    name="title"
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 bg-gray-50 dark:text-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                    placeholder="作品のタイトルを入力"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-md font-semibold leading-6 text-gray-900 dark:text-gray-100"
                >
                  説明
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="input_description"
                    name="description"
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 bg-gray-50 dark:text-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                    placeholder="作品の説明を入力"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="url"
                  className="block text-md font-semibold leading-6 text-gray-900 dark:text-gray-100"
                >
                  URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    id="input_url"
                    name="url"
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 bg-gray-50 dark:text-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="img"
                  className="block text-md font-semibold leading-6 text-gray-900 dark:text-gray-100"
                >
                  画像
                </label>
                <div className="mt-2">
                  <ImageInput initialImg={initialImg} onChange={(file: File) => setImg(file)} />
                </div>
              </div>
            </div>
          </div>
          {/* カードプレビュー */}
          <div className="border-b border-gray-900/10 dark:border-gray-200/10 pb-12">
            <div className="col-span-full">
              <label
                htmlFor="preview"
                className="block text-md font-semibold leading-6 text-gray-900 dark:text-gray-100"
              >
                プレビュー
              </label>
              <div className="my-3 grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <div className=" bg-gray-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-56 p-4"
                    style={{
                      backgroundImage: `url(${img.name ? URL.createObjectURL(img) : initialImg})`,
                    }}
                  >
                    <div className="flex justify-end">
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {visibility ? '公開' : 'プライベート'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {title || 'Title'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {description || 'Description'}
                    </p>
                    <div className="flex flex-wrap justify-between mt-2">
                      <div className="relative flex gap-x-2 text-xs items-center text-gray-500 dark:text-gray-400 z-10">
                        <div
                          className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${work.author.image})`,
                          }}
                        />

                        <p className="flex text-md mt-1 text-gray-500 dark:text-gray-400 z-10">
                          @{work.author.name ? work.author.name : 'Unknown'}
                        </p>
                      </div>
                      <p className="mt-5 text-xs text-gray-500 dark:text-gray-500">
                        <TimeAgo date={work.created_at} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 dark:border-gray-200/10 pb-12">
            <div className="col-span-full">
              <label
                htmlFor="visibility"
                className="block text-md font-semibold leading-6 text-gray-900 dark:text-gray-100"
              >
                公開設定
              </label>
              <div className="mt-2">
                <div className="flex items-center">
                  <input
                    id="input_visibility"
                    name="visibility"
                    type="checkbox"
                    className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                    checked={visibility}
                    defaultChecked={visibility}
                    onChange={(event) => setVisibility(event.target.checked)}
                  />
                  <label
                    htmlFor="visibility"
                    className="ml-3 block text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    公開する
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-6">
          <div className="mb-4">
            <AnounceGuideLine />
          </div>
          <div className="flex items-center justify-between gap-x-6">
            <Link
              href={`/${work.author.name}`}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
            >
              戻る
            </Link>
            <SubmitButton
              isInputFilled={!isButtonDisabled}
              visibility={visibility}
              isFetching={isFetching}
            />
          </div>
        </div>
      </form>
      <div className="border-t border-gray-900/10 dark:border-gray-200/10 py-6">
        <h3 className="text-md font-semibold leading-6 text-gray-900 dark:text-gray-100 mb-4">
          変更不可な項目
        </h3>
        <div
          className="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          role="alert"
        >
          <div className="flex items-center  flex-col sm:flex-row gap-2">
            <div className="flex-1 flex">
              <div className="ms-4">
                <h3 className="text-sm font-semibold">成果物の削除</h3>
                <div className="mt-1 text-sm text-red-700 dark:text-red-400">
                  一度削除すると、元に戻すことはできません
                </div>
              </div>
            </div>
            <DeleteForm id={workId} />
          </div>
        </div>
      </div>
    </>
  )
}
