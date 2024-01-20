'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Provider = (props: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {props.children}
    </ThemeProvider>
  )
}

export default Provider
