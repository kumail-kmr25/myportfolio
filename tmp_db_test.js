const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL
    }
  }
});

async function main() {
  try {
    console.log("Checking DIRECT DB connection...");
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("Connection successful:", result);
    
    console.log("Checking FeatureToggle table...");
    const features = await prisma.featureToggle.findMany();
    console.log("Features found:", features.length);
  } catch (e) {
    console.error("DB Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
