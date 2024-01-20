import { notFound, usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import prisma from '@/lib/prisma'
import ArticleCard from './Article/ArticleCard'

export default async function UserContents() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  // params がない場合は、'articles'を表示する
  const tab = searchParams ? searchParams : 'articles'

  if (tab === 'articles') {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        created_at: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: -10,
    })
    return (
      <>
        {articles.map((article) => (
          <ArticleCard key={article.id} data={article} />
        ))}
      </>
    )
    // } else if (tab === 'works') {
    //   const works = await prisma.work.findMany({
    //     select: {
    //       id: true,
    //       title: true,
    //       created_at: true,
    //       author: {
    //         select: {
    //           name: true,
    //           image: true,
    //         },
    //       },
    //       tags: {
    //         select: {
    //           id: true,
    //           name: true,
    //         },
    //       },
    //     },
    //     orderBy: {
    //       created_at: 'desc',
    //     },
    //     take: -10,
    //   })
    //   return <></>
    // } else if (tab === 'comments') {
    //   const comments = await prisma.comment.findMany({
    //     select: {
    //       id: true,
    //       created_at: true,
    //     },
    //     orderBy: {
    //       created_at: 'desc',
    //     },
    //     take: -10,
    //   })

    //   return <></>
    // } else {
    //   return notFound()
    // }
  }
}
