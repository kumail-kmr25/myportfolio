import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const messages = await prisma.contactSubmission.findMany();
    console.log("Total messages:", messages.length);

    if (messages.length > 0) {
        console.log("First message ID:", messages[0].id);

        // Let's manually trigger the DB deletion
        try {
            await prisma.contactSubmission.delete({
                where: { id: messages[0].id }
            });
            console.log("Prisma delete successful");
        } catch (err) {
            console.error("Prisma error:", err);
        }
    } else {
        console.log("No messages found.");
    }
}

main().finally(async () => {
    await prisma.$disconnect();
});
