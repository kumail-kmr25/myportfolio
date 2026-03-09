const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Update Edunova with confirmed real links
    const edunova = await prisma.project.updateMany({
        where: { title: { contains: "Edunova", mode: "insensitive" } },
        data: {
            github: "https://github.com/kumail-kmr25/Edunova-saas",
            demo: "https://edunova-saas.vercel.app",
        },
    });
    console.log(`Updated Edunova: ${edunova.count} record(s)`);

    // Log all projects current state
    const all = await prisma.project.findMany({
        select: { title: true, github: true, demo: true, isVisible: true },
        orderBy: { title: "asc" }
    });
    console.log("\nAll projects:");
    all.forEach(p => {
        console.log(`  [${p.isVisible ? "VISIBLE" : "hidden "}] ${p.title}`);
        console.log(`    github: ${p.github}`);
        console.log(`    demo:   ${p.demo}`);
    });
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
