'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Provider = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>
}

export default Provider
