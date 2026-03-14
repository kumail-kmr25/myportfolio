const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

console.log("--- PRISMA MODELS START ---");
Object.keys(prisma).forEach(key => {
    if (!key.startsWith('$') && !key.startsWith('_')) {
        console.log(key);
    }
});
console.log("--- PRISMA MODELS END ---");
process.exit(0);
