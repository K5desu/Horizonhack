import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/AuthOption'

import Link from 'next/link'
import { redirect } from 'next/navigation'

import LoginButton from '@/components/Auth/LoginButton'

export default async function SignIn() {
  const resp: ReturnType<typeof getProviders> = (await getProviders()) || {}

  return (
    <>
      <div className="mx-auto my-10 w-full max-w-md p-6">
        <div className="mt-7 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Horizon メンバーのみアクセス可能です
              </p>
            </div>

            <div className="mt-5">
              {Object.values(resp).map((provider) => (
                <div key={provider.name}>
                  <LoginButton auth={provider} />
                </div>
              ))}

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
      </div>
    </>
  )
}

export async function getProviders() {
  const session = await getServerSession(authOptions)

  // サインイン済みならリダイレクト
  if (session) {
    return redirect('/')
  }

  const providers = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/providers`)
  if (providers.status === 200) {
    return providers.json()
  }
  return {}
}
