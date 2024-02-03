import type { Metadata } from 'next'
import { Inter, Roboto_Flex } from 'next/font/google'
import '@/app/globals.css'

import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/Providers/SessionProvider'
import ThemeProvider from '@/components/Providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })
const roboto_flex = Roboto_Flex({ subsets: ['latin'] })
const fonts = `${inter.style.fontFamily}, ${roboto_flex.style.fontFamily}`
const fontStyle = {
  fontFamily: `${fonts}`,
  fontStyle: 'normal',
}

export const metadata: Metadata = {
  title: 'Link Mono',
  description: 'A Knowledge sharing app for developers in the Ryukoku Horizon community.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col dark:bg-gray-950`} style={fontStyle}>
        <ThemeProvider>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
