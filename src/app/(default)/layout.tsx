import { getServerSession } from 'next-auth'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Toaster } from '@/components/Toaster'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <>
      <Header session={session} />
      <div className="relative flex-1">
        <Toaster position="bottom-center" reverseOrder={false} />
        {children}
      </div>
      <Footer />
    </>
  )
}
