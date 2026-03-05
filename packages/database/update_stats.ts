import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const stats = await prisma.siteStats.findFirst();

    if (stats) {
        const updatedStats = await prisma.siteStats.update({
            where: { id: stats.id },
            data: {
                yearsLearning: 2,
                deploymentCount: 102,
                lastUpdated: new Date(),
            },
        });
        console.log('Stats updated successfully:', updatedStats);
    } else {
        const newStats = await prisma.siteStats.create({
            data: {
                yearsLearning: 2,
                deploymentCount: 102,
                totalProjects: 0,
                bugsFixed: 0,
                caseStudiesWritten: 0,
                featureRequestsCompleted: 0,
            },
        });
        console.log('Stats created successfully:', newStats);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
