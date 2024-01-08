import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import Inner from '@/components/Inner'
import Textarea from '@/components/Article/Textarea'
import ArticleDeleteBtn from '@/components/Article/DeleteBtn'

export default async function ArticlesIdEditPage({ params }: { params: { id: string } }) {
  const session = await getServerSession()
  let article = null
  const articleId = params.id
  try {
    article = await prisma.article.findUniqueOrThrow({
      where: {
        id: articleId,
      },
      select: {
        id: true,
        title: true,
        body: true,
        created_at: true,
        updated_at: true,
        visibility: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  } catch (error) {
    return notFound()
  }

  if (!session || session.user.name !== article.author.name) {
    return forbidden()
  }

  const addArticle = async (formData: FormData) => {
    'use server'
    const visibirity = formData.get('radio_visibility')

    const rawFormData = {
      title: formData.get('title'),
      body: formData.get('body'),
      visibility: visibirity === 'public' ? true : false,
    }

    const article = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title: rawFormData.title as string,
        body: rawFormData.body as string,
        visibility: rawFormData.visibility as boolean,
      },
    })
    redirect(`/${session.user.name}/articles/${articleId}`)
  }

  const formatbody = article.body?.replace(/\\`/g, '`')
  return (
    <>
      <Inner>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Edit Article</h2>
        <form action={addArticle}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 dark:border-gray-200/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-md font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Title {'(Required)'}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="input_title"
                      name="title"
                      defaultValue={article.title || 'untitled'}
                      className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 bg-gray-50 dark:text-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="body"
                    className="block text-md font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Body {'(Required)'}
                  </label>
                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    Edit Markdown
                  </p>
                  <div className="mt-2">
                    <Textarea defaultValue={formatbody} />
                  </div>
                </div>

                {/* <div className="col-span-full">
                  <label
                    htmlFor="tags"
                    className="block text-md font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Tags {'(Max 5)'}
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <button
                      type="button"
                      className="rounded-md bg-white dark:bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-gray-700 dark:hover:bg-gray-950"
                    >
                      + Add
                    </button>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="border-b border-gray-900/10 dark:border-gray-200/10 pb-12">
              <div className="space-y-10">
                <fieldset>
                  <legend className="text-md font-semibold leading-6 text-gray-900 dark:text-gray-100">
                    Visibility
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    Choose who can view this article.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="radio_private"
                        name="radio_visibility"
                        type="radio"
                        value="private"
                        className="h-4 w-4 border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-600"
                        defaultChecked={article.visibility === false || article.visibility === null}
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >
                        Private
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="radio_public"
                        name="radio_visibility"
                        type="radio"
                        value="public"
                        className="h-4 w-4 border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-600"
                        defaultChecked={article.visibility === true}
                      />
                      <label
                        htmlFor="radio_public"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >
                        Public
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="border-b border-gray-900/10 dark:border-gray-200/10 pb-12">
              <div
                className="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
                role="alert"
              >
                <div className="flex items-center">
                  <div className="flex-1 flex">
                    {/* <div className="flex-shrink-0">
                      <svg
                        className="flex-shrink-0 h-4 w-4 mt-0.5"
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
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                      </svg>
                    </div> */}
                    <div className="ms-4">
                      <h3 className="text-sm font-semibold">Delete this article</h3>
                      <div className="mt-1 text-sm text-red-700 dark:text-red-400">
                        Once you delete this article, it cannot be recovered.
                      </div>
                    </div>
                  </div>
                  <ArticleDeleteBtn id={articleId} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-x-6">
            <div className="flex items-center justify-between gap-x-6">
              <Link
                href={`/${session.user.name}`}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
              >
                戻る
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                保存
              </button>
            </div>
          </div>
        </form>
      </Inner>
    </>
  )
}
function forbidden() {
  {
    ;`
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-semibold text-gray-900">403</h1>
    <p className="mt-2 text-sm text-gray-500">
      You are not authorized to access this page.
    </p>
  `
  }
}
