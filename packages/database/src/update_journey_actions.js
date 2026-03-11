const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Updating journey phases with interactive actions...');

    const phases = await prisma.journeyPhase.findMany({
        orderBy: { order: 'asc' }
    });

    const actions = [
        { label: 'Explore Foundation', url: '#skills' },
        { label: 'View Case Studies', url: '#projects' },
        { label: 'Start Project', url: '' },
        { label: 'Contact Now', url: '' }
    ];

    for (let i = 0; i < phases.length; i++) {
        if (actions[i]) {
            await prisma.journeyPhase.update({
                where: { id: phases[i].id },
                data: {
                    actionLabel: actions[i].label,
                    actionUrl: actions[i].url
                }
            });
            console.log(`Updated Phase ${i + 1}: ${actions[i].label}`);
        }
    }

    console.log('Done!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
