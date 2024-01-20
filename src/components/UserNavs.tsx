import Link from 'next/link'

export default function UserNavs({
  params,
  userProfile,
}: {
  params?: { username: string }
  userProfile: { id: string; name: string | null; image: string | null }
}) {
  const userProfileName = userProfile?.name
  const navigations = [
    { label: '記事', href: `/${userProfileName}`, current: true },
    { label: '制作物', href: `/${userProfileName}?tab=works`, current: true },
    { label: 'コメント', href: `/${userProfileName}?tab=comments`, current: true },
  ]
  {
    navigations.map((nav) => {
      nav.current = nav.href === params?.username
    })
  }

  return (
    <>
      <nav className="mt-4 flex items-baseline space-x-4">
        {navigations.map((nav) => (
          <Link
            key={nav.label}
            className={`${
              nav.current
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white '
                : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
            } rounded-md px-3 py-2 text-sm font-medium`}
            href={nav.href}
          >
            {nav.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
