'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { updateArticle } from '@/app/api/article/edit/EditActions'
import Textarea from '@/components/Article/Edit/Textarea'
import DeleteForm from '@/components/Article/Edit/DeleteForm'
import { AnounceGuideLine } from '@/components/Anounce'
import { TagInput } from '@/components/Tag/TagInput'
import toast from 'react-hot-toast'

function SubmitButton({
  isInputFilled,
  visibility,
}: {
  isInputFilled: boolean
  visibility: boolean
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
        isButtonDisabled ? `opacity-30 ${buttonHoverDisabled}` : ''
      }`}
      aria-disabled={isButtonDisabled}
      disabled={isButtonDisabled}
    >
      {pending ? '更新中...' : `更新 | ${visibility ? '公開' : 'プライベート'}`}
    </button>
  )
}

interface Article {
  id: string
  title: string | null
  body: string | null
  visibility: boolean | null
  created_at: Date
  updated_at: Date
  author: {
    name: string | null
    image: string | null
  }
  tags: {
    id: number
    name: string
  }[]
}

const initialState = {
  message: '',
  id: '',
}

export default function ArticleEditForm({ article }: { article: Article }) {
  const [state, formAction] = useFormState(updateArticle, initialState)
  const formatbody = article.body?.replace(/\\`/g, '`')
  const articleId = article.id

  const initialTitle = article.title || ''
  const initialBody = formatbody || ''
  const initialTags = article.tags.map((tag) => tag.name)
  const initialVisibility = article.visibility || false

  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)
  const [tags, setTags] = useState(initialTags)
  const [visibility, setVisibility] = useState(initialVisibility)
  const [isButtonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    if (
      title === initialTitle &&
      body === initialBody &&
      tags.toString() === initialTags.toString() &&
      visibility === initialVisibility
    ) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [title, body, tags, visibility, initialTitle, initialBody, initialTags, initialVisibility])

  useEffect(() => {
    if (state.message === 'success') {
      window.location.href = `/${article.author.name}/articles/${articleId}`
      toast.success('記事を更新しました')
    }
  }, [state.message, article.author.name, articleId])

  const handleTagsChange = (tags: string[]) => {
    setTags(tags)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (tags.length === 0) {
      alert('１つ以上のタグが必須です')
      return
    }

    formAction(new FormData(event.target as HTMLFormElement))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <input type="hidden" name="articleId" value={articleId} />
          <div className="border-b border-gray-900/10 pb-12 dark:border-gray-200/10">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="text-md block font-bold leading-6 text-gray-900 dark:text-gray-100"
                >
                  タイトル {'(必須)'}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="input_title"
                    name="title"
                    defaultValue={article.title || ''}
                    className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6"
                    placeholder="記事のタイトルを入力"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="body"
                  className="text-md block font-bold leading-6 text-gray-900 dark:text-gray-100"
                >
                  本文 {'(必須)'}
                </label>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Markdown 形式で記述してください
                </p>
                <Link
                  href="/docs/markdown"
                  className="mt-2 text-xs leading-6 text-gray-400 underline dark:text-gray-500"
                  target="_blank"
                >
                  Markdown記法 | Link Mono
                </Link>
                <div className="mt-2">
                  <Textarea defaultValue={body} onChange={(e) => setBody(e.target.value)} />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="tags"
                  className="text-md block font-bold leading-6 text-gray-900 dark:text-gray-100"
                >
                  タグ {'(必須)'}
                </label>
                <div className="mt-2">
                  <TagInput initTags={tags} onChange={handleTagsChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12 dark:border-gray-200/10">
            <div className="space-y-10">
              <fieldset>
                <legend className="text-md font-semibold leading-6 text-gray-900 dark:text-gray-100">
                  公開設定
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  記事の公開設定を変更できます
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="radio_private"
                      name="radio_visibility"
                      type="radio"
                      value="private"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-700"
                      defaultChecked={article.visibility === false || article.visibility === null}
                      onChange={() => setVisibility(false)}
                    />
                    <label
                      htmlFor="radio_private"
                      className="block text-sm font-bold leading-6 text-gray-900 dark:text-gray-100"
                    >
                      プライベート
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="radio_public"
                      name="radio_visibility"
                      type="radio"
                      value="public"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-700"
                      defaultChecked={article.visibility === true}
                      onChange={() => setVisibility(true)}
                    />
                    <label
                      htmlFor="radio_public"
                      className="block text-sm font-bold leading-6 text-gray-900 dark:text-gray-100"
                    >
                      公開
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="my-6">
          <div className="mb-4">
            <AnounceGuideLine />
          </div>
          <div className="flex items-center justify-between gap-x-6">
            <Link
              href={`/${article.author.name}`}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
            >
              戻る
            </Link>
            <SubmitButton isInputFilled={!isButtonDisabled} visibility={visibility} />
          </div>
        </div>
      </form>
      <div className="border-t border-gray-900/10 py-6 dark:border-gray-200/10">
        <h3 className="text-md mb-4 font-semibold leading-6 text-gray-900 dark:text-gray-100">
          変更不可な項目
        </h3>
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-800/10 dark:text-red-500"
          role="alert"
        >
          <div className="flex flex-col  items-center gap-2 sm:flex-row">
            <div className="flex flex-1">
              <div className="ms-4">
                <h3 className="text-sm font-semibold">記事の削除</h3>
                <div className="mt-1 text-sm text-red-700 dark:text-red-400">
                  一度削除すると、元に戻すことはできません
                </div>
              </div>
            </div>
            <DeleteForm id={articleId} />
          </div>
        </div>
      </div>
    </>
  )
}
