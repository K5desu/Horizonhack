import Footer from '@/components/Footer/Footer'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex flex-1 items-center">{children}</div>
      <Footer />
    </>
  )
}
