const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function check() {
  const count = await prisma.project.count();
  const projects = await prisma.project.findMany({ select: { title: true } });
  console.log(`Total projects: ${count}`);
  console.log("Project list:", projects.map(p => p.title).join(", "));
  await prisma.$disconnect();
}

check();
