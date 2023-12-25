import Textarea from '@/components/Article/Textarea'
import Inner from '@/components/Inner'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import ArticleDeleteBtn from '@/components/Article/ArticleDeleteBtn'

export default async function ArticlesIdEditPage({ params }: { params: { id: string } }) {
  const session = await getServerSession()
  let article = null
  try {
    article = await prisma.article.findUniqueOrThrow({
      where: {
        id: params.id,
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
    let id = params.id
    const visibirity = formData.get('radio_visibility')

    const rawFormData = {
      title: formData.get('title'),
      body: formData.get('body'),
      visibility: visibirity === 'public' ? true : false,
    }

    const article = await prisma.article.update({
      where: {
        id: id,
      },
      data: {
        title: rawFormData.title as string,
        body: rawFormData.body as string,
        visibility: rawFormData.visibility as boolean,
      },
    })
    redirect(`/${session.user.name}/articles/${id}`)
  }

  const formatbody = article.body?.replace(/\\`/g, '`')
  return (
    <>
      <Inner>
        <form action={addArticle}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 dark:border-gray-200/10 pb-12">
              <h2 className="text-3xl font-semibold  text-gray-900 dark:text-gray-100">
                Create new Article
              </h2>

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
              <div className="mt-10 space-y-10">
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
          </div>

          <div className="mt-6 flex items-center justify-between gap-x-6">
            <ArticleDeleteBtn articleId={params.id} />

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
