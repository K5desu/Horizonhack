'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Providers = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>
}

export default Providers
