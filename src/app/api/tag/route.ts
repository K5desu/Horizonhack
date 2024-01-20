import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const searchWord = searchParams.get('name') || ''
  const tags = await prisma.tag.findMany({
    where: {
      name: {
        contains: searchWord,
        mode: 'insensitive',
      },
    },
    select: {
      name: true,
      articles: {
        select: {
          id: true,
        },
      },
      users: {
        select: {
          userId: true,
        },
      },
    },
    take: 5,
  })
  const response = tags.map((tag) => {
    return {
      name: tag.name,
      articles: tag.articles.length,
      users: tag.users.length,
    }
  })
  return NextResponse.json(response)
}
