const { PrismaClient } = require("@prisma/client");
const fs = require('fs');
const path = require('path');

// Manually parse .env.local because dotenv might not find it if we're not careful
const envPath = path.join(__dirname, 'client', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL="([^"]+)"/);

if (!dbUrlMatch) {
    console.error("Could not find DATABASE_URL in client/.env.local");
    process.exit(1);
}

process.env.DATABASE_URL = dbUrlMatch[1];
console.log("Using DATABASE_URL from client/.env.local");

const prisma = new PrismaClient();

async function main() {
    try {
        const projects = await prisma.project.findMany();
        console.log(`Found ${projects.length} projects.`);
        if (projects.length > 0) {
            console.log("Projects in DB:");
            projects.forEach(p => {
                console.log(`- ${p.title} (ID: ${p.id}, Visible: ${p.isVisible})`);
            });
        } else {
            console.log("Database is empty of projects.");
        }
    } catch (error) {
        console.error("Error connecting to database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
