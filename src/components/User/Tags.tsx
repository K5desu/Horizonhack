import prisma from '@/lib/prisma'
import Tag from '../Tag/Tag'

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
    name: tag.tag.name,
    status: tag.status.status,
  }))

  const LearningTags = TagsList.filter((tag) => tag.status === 'Learning')
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-50">学習中のタグ</h3>
      <div className="flex flex-wrap gap-2">
        {LearningTags.map((tag) => (
          <Tag key={tag.name} name={tag.name} />
        ))}
      </div>
    </div>
  )
}
