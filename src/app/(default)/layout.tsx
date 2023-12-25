import { getServerSession } from 'next-auth'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <>
      <Header session={session} />
      <div className="relative flex-1">{children}</div>
      <Footer />
    </>
  )
}
