import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function init() {
  const appOfficial = await prisma.user.upsert({
    where: { email: 'official' },
    update: {},
    create: {
      name: 'LinkMono(Official)',
      displayName: 'Link Mono (公式)',
      email: 'official',
      image: '/LinkMonoIcon.png',
      role: 'official',
    },
  })

  const officialArticle = await prisma.user.update({
    where: { id: appOfficial.id },
    data: {
      articles: {
        create: {
          title: 'Markdown とは',
          body: '',
          visibility: true,
        },
      },
    },
  })

  const tagsOnUsers_StatusTypes = await prisma.tagsOnUsers_StatusType.createMany({
    data: [
      { status: 'Scheduled for learning' },
      { status: 'Learning' },
      { status: 'Learned' },
      { status: 'Interested' },
    ],
  })

  console.log({ appOfficial, officialArticle, tagsOnUsers_StatusTypes })
}

init()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
