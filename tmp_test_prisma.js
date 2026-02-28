const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function test() {
    console.log("Prisma Client loaded successfully");
    await prisma.$disconnect();
}
test();
