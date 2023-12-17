import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  await prisma.work.update({
    where: {
      id: 'K5test',
    },
    data: {
      title: 'title',
      url: 'sjdkk',
      img: 'https://bigsrjkqtbcyzvo6.public.blob.vercel-storage.com/k12a-w4eXEdKPPkJg8YeKBfY2IQIONyjN9F.PNG',
    },
  })
}
main()
// pages/api/generate-uuid.js
