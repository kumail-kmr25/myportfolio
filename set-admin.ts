import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const admin = await prisma.admin.upsert({
        where: { email: 'admin@example.com' },
        update: { password: hashedPassword },
        create: {
            userId: 'admin123',
            name: 'Test Admin',
            email: 'admin@example.com',
            phone: '1234567890',
            password: hashedPassword,
        },
    });
    console.log('Admin ready: admin@example.com / password123');
}

main().finally(() => prisma.$disconnect());
