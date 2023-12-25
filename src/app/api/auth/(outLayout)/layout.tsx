import Footer from '@/components/Footer/Footer'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex-1 flex items-center">{children}</div>
      <Footer />
    </>
  )
}
