'use client'

import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function ImageInput({
  initialImg,
  onChange,
}: {
  initialImg: string
  onChange: (file: File) => void
}) {
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })
  const [file, setFile] = useState<File | null>(null)

  const [dragActive, setDragActive] = useState(false)

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 5) {
          toast.error('ファイルが大きすぎます（5MBまで）')
        } else if (!['image/png', 'image/jpeg'].includes(file.type)) {
          toast.error('ファイル形式が正しくありません（.png .jpg .jpeg）')
        } else {
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }))
          }
          reader.readAsDataURL(file)
          onChange(file)
        }
      }
    },
    [setData, onChange]
  )

  const [saving, setSaving] = useState(false)

  const saveDisabled = useMemo(() => {
    return !data.image || saving
  }, [data.image, saving])

  return (
    <>
      <div>
        <div className="mb-4 space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">最大： 5MB</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">形式： PNG JPEG</p>
        </div>
        <label
          htmlFor="image-upload"
          className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)

              const file = e.dataTransfer.files && e.dataTransfer.files[0]
              if (file) {
                if (file.size / 1024 / 1024 > 5) {
                  toast.error('ファイルサイズが大きすぎます（5MBまで）')
                } else if (!['image/png', 'image/jpeg'].includes(file.type)) {
                  toast.error('ファイル形式が正しくありません（.png .jpg .jpeg）')
                } else {
                  setFile(file)
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    setData((prev) => ({
                      ...prev,
                      image: e.target?.result as string,
                    }))
                  }
                  reader.readAsDataURL(file)
                  onChange(file)
                }
              }
            }}
          />
          <div
            className={`${
              dragActive ? 'border-2 border-black' : ''
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
              data.image || initialImg
                ? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md dark:bg-gray-800/80'
                : 'bg-white opacity-100 hover:bg-gray-50 dark:bg-gray-900'
            }`}
          >
            <svg
              className={`${
                dragActive ? 'scale-110' : 'scale-100'
              } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              ドラック＆ドロップまたはクリックしてアップロード
            </p>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">最大:5MB</p>
            <span className="sr-only">画像アップロード</span>
          </div>
          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              src={data.image}
              alt="Preview"
              className="h-full w-full rounded-md object-contain"
              width={512}
              height={512}
            />
          )}
          {!data.image && initialImg && (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              src={initialImg}
              alt="Preview"
              className="h-full w-full rounded-md object-contain"
              width={512}
              height={512}
            />
          )}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            type="file"
            accept=".png, .jpg, .jpeg"
            className="sr-only"
            onChange={onChangePicture}
          />
        </div>
      </div>
    </>
  )
}
