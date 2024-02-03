import Link from 'next/link'

export type ErrorPageParam = 'Configuration' | 'AccessDenied' | 'Verification' | undefined

export interface ErrorProps {
  searchParams: {
    error?: ErrorPageParam
  }
}

interface ErrorView {
  status: number
  heading: string
  message?: string
}

function errors(error: ErrorPageParam): ErrorView {
  switch (error) {
    case 'Configuration':
      return {
        status: 500,
        heading: 'サーバーエラー',
        message: 'サーバー管理者に連絡してください',
      }
    case 'AccessDenied':
      return {
        status: 403,
        heading: 'アクセス制限',
        message: `龍谷大学Horizonメンバーのみアクセス可能です\n引き続き、サインインせずに閲覧いただけます\n※部内者であるにも関わらず、この画面が表示される場合は、管理者に連絡してください。`,
      }

    case 'Verification':
      return {
        status: 403,
        heading: 'Unable to sign in',
        message: 'Your account has not been verified.',
      }

    default:
      return {
        status: 200,
        heading: 'エラー',
        message: '予期せぬエラーが発生しました\nしばらく時間をおいてから再度お試しください',
      }
  }
}

export default function ErrorPage({ searchParams }: ErrorProps) {
  const signInPageURL = '/api/auth/signin'
  const error = searchParams.error

  const { status, heading, message } = errors(error)

  return (
    <div className="absolute m-0 mx-auto my-10 box-border grid h-full w-full place-items-center p-0 px-6 sm:px-8 lg:px-10">
      <div className="mt-7 max-w-md rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm dark:border-gray-700 dark:bg-slate-900 sm:p-7">
        {/* ステータスコードを表示 */}
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-500 dark:text-white">{status}</h1>
        </div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{heading}</h1>
        <div className="message">
          <p className="mt-2 whitespace-break-spaces text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
        </div>
        <div className="mt-5">
          <Link
            href={signInPageURL}
            className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Sign in
          </Link>
          <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:me-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
            Or
          </div>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
