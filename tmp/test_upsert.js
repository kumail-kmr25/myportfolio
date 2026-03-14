const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
    try {
        console.log("Testing FeatureToggle access...");
        const ft = await prisma.featureToggle.findMany();
        console.log("Existing toggles:", ft.length);
        
        console.log("Testing upsert...");
        await prisma.featureToggle.upsert({
            where: { featureKey: "test-feature" },
            update: {},
            create: {
                featureKey: "test-feature",
                name: "Test Feature",
                category: "engagement",
                enabled: false
            }
        });
        console.log("Upsert successful!");
    } catch (err) {
        console.error("Test failed!");
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

test();
