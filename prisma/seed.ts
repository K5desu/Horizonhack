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

  const mainTagsList = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Vue',
    'Angular',
    'Node.js',
    'Express',
    'NestJS',
    'Next.js',
    'Nuxt.js',
  ]
  const tags = await prisma.tag.createMany({
    data: mainTagsList.map((tagName) => ({ name: tagName })),
  })

  const work = await prisma.work.create({
    data: {
      title: 'LinkMono',
      description: 'LinkMono の開発を行っています。',
      url: 'https://github.com/Ryukoku-Horizon/2023-Hack-S-no1',
      img: '/LinkMonoIcon.png',
      visibility: true,
      author: {
        connect: { id: appOfficial.id },
      },
    },
  })

  console.log({ appOfficial, officialArticle, tagsOnUsers_StatusTypes, tags, work })
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
