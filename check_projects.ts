
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany()
  console.log(`Found ${projects.length} projects:`)
  projects.forEach(p => {
    console.log(`- ${p.title} (Featured: ${p.isFeatured}, Visible: ${p.isVisible})`)
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
