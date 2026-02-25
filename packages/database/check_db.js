const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const projectCount = await prisma.project.count();
    const testimonialCount = await prisma.testimonial.count();
    const adminCount = await prisma.admin.count();
    console.log({ projectCount, testimonialCount, adminCount });
}

check()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
