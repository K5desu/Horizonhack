import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Link Mono',
  description: 'A Knowledge sharing app for developers in the Ryukoku Horizon community.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col dark:bg-gray-950`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
