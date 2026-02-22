import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
    const adminName = process.env.ADMIN_NAME || 'Portfolio Admin';
    const adminUserId = process.env.ADMIN_USER_ID || 'admin_001';

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.admin.upsert({
        where: { email: adminEmail },
        update: { password: hashedPassword },
        create: {
            userId: adminUserId,
            name: adminName,
            email: adminEmail,
            phone: '0000000000',
            password: hashedPassword,
        },
    });
    console.log(`Admin ready: ${adminEmail} / [PASSWORD HIDDEN]`);
}

main().finally(() => prisma.$disconnect());
