import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.admin.findFirst({
        where: { email: 'ka6307464@gmail.com' }
    });

    if (!admin) {
        console.log('Admin not found');
        return;
    }

    const isValid = await bcrypt.compare('admin123', admin.password);
    console.log(`Password 'admin123' is valid: ${isValid}`);
    console.log(`Stored hash: ${admin.password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
