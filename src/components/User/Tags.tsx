import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function UserTags({ username }: { username: string }) {
  const tags = await prisma.user.findMany({
    where: {
      name: username,
    },
    select: {
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
          status: {
            select: {
              status: true,
            },
          },
        },
      },
    },
  })
  const TagsList = tags[0].tags.map((tag) => ({
    id: tag.tag.id,
    name: tag.tag.name,
    status: tag.status.status,
  }))
  const tagsWithCounts = await Promise.all(
    TagsList.map(async (tag) => {
      const tagOnArticle = await prisma.article.count({
        where: {
          tags: {
            some: {
              name: {
                contains: tag.name,
              },
            },
          },
        },
      })
      const tagOnUser = await prisma.tagsOnUsers.count({
        where: {
          tagId: tag.id,
        },
      })

      return {
        ...tag,
        tagOnArticle,
        tagOnUser,
      }
    })
  )
  const ScheduledTags = tagsWithCounts.filter((tag) => tag.status === 'Scheduled for learning')
  const LearningTags = tagsWithCounts.filter((tag) => tag.status === 'Learning')
  const LearnedTags = tagsWithCounts.filter((tag) => tag.status === 'Learned')
  const InterestedTags = tagsWithCounts.filter((tag) => tag.status === 'Interested')

  interface TagCardProps {
    tag: {
      id: number
      name: string
      tagOnArticle: number
      tagOnUser: number
    }
    index: number
    last: boolean
  }
  function TagCard({ tag }: TagCardProps) {
    return (
      <Link href={`/tags/${tag.name}`} className="group">
        <div
          className={`flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900`}
        >
          <div className="flex items-center">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <p className="text-2xl font-bold text-gray-500">#</p>
            </div>
            <div>
              <p className="text-lg font-bold group-hover:underline">{tag.name}</p>
              <p className="text-sm text-gray-500">
                Use in {tag.tagOnArticle} articles, {tag.tagOnUser} users
              </p>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-y-2 text-gray-700 dark:text-gray-200">
        {ScheduledTags.length !== 0 && (
          <>
            <p className="text-lg font-semibold">学習予定</p>
            {ScheduledTags.map((tag, index) => (
              <TagCard
                key={index}
                tag={tag}
                index={index}
                last={index === LearningTags.length - 1 ? true : false}
              />
            ))}
          </>
        )}
        {LearningTags.length !== 0 && (
          <>
            <p className="text-lg font-semibold">学習中</p>
            {LearningTags.map((tag, index) => (
              <TagCard
                key={index}
                tag={tag}
                index={index}
                last={index === LearningTags.length - 1 ? true : false}
              />
            ))}
          </>
        )}
        {LearnedTags.length !== 0 && (
          <>
            <p className="text-lg font-semibold">学習済</p>
            {LearnedTags.map((tag, index) => (
              <TagCard
                key={index}
                tag={tag}
                index={index}
                last={index === LearnedTags.length - 1 ? true : false}
              />
            ))}
          </>
        )}
        {InterestedTags.length !== 0 && (
          <>
            <p className="text-lg font-semibold">興味あり</p>
            {InterestedTags.map((tag, index) => (
              <TagCard
                key={index}
                tag={tag}
                index={index}
                last={index === InterestedTags.length - 1 ? true : false}
              />
            ))}
          </>
        )}
        {TagsList.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">まだ、タグがありません</p>
        )}
      </div>
    </>
  )
}
