import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const adminCount = await prisma.admin.count()
    console.log(`ADMIN_COUNT:${adminCount}`)
    process.exit(0)
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
