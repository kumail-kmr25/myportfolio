const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  console.log('--- DATABASE DIAGNOSTIC ---');
  try {
    const result = await prisma.$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
    console.log('Tables found:', result.map(t => t.tablename).join(', '));
    
    const settingsExists = result.some(t => t.tablename.toLowerCase() === 'settings');
    console.log('Settings table exists:', settingsExists);

    if (settingsExists) {
        const columns = await prisma.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name = 'Settings'`;
        console.log('Settings columns:', columns.map(c => c.column_name).join(', '));
    }

  } catch (error) {
    console.error('Database connection error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
