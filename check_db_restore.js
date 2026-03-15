const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function checkConnection(url, label) {
  const prisma = new PrismaClient({
    datasources: { db: { url } }
  });
  try {
    console.log(`Checking ${label}...`);
    await prisma.$queryRaw`SELECT 1`;
    console.log(`${label}: SUCCESS`);
    return true;
  } catch (e) {
    console.log(`${label}: FAILED - ${e.message.split('\n')[0]}`);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const dbConnected = await checkConnection(process.env.DATABASE_URL, "DATABASE_URL (Pooled)");
  const directConnected = await checkConnection(process.env.DIRECT_URL, "DIRECT_URL (Non-Pooled)");
  
  if (dbConnected || directConnected) {
    console.log("\nStatus: Database is REACHABLE. Ready to sync.");
  } else {
    console.log("\nStatus: Database is still UNREACHABLE.");
  }
}

main();
