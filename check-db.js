const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const submissions = await prisma.contactSubmission.findMany();
    fs.writeFileSync('c:/portfolio/db-out.json', JSON.stringify(submissions, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
