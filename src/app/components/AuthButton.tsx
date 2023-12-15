'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        {/* sessionの中身を確認 */}
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <img src={session?.user.image || ''} alt="" />@{session?.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  } else {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }
}
