export default function Inner({ children }: { children: React.ReactNode }) {
  return <div className={`relative mx-auto my-10 max-w-7xl px-6 sm:px-8 lg:px-10`}>{children}</div>
}
