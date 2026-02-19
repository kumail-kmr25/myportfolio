const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("Starting seed process...");

    // 1. Create Admin
    const adminEmail = "ka6307464@gmail.com";
    const hashedPassword = await bcrypt.hash("admin123", 10);

    try {
        await prisma.admin.upsert({
            where: { email: adminEmail },
            update: {},
            create: {
                email: adminEmail,
                password: hashedPassword,
            },
        });
        console.log("✅ Admin seeded.");
    } catch (error) {
        console.error("❌ Admin seed failed:", error);
    }

    // 2. Create Projects
    const projects = [
        {
            title: "EduNova LMS",
            description: "A comprehensive School Management System with 2FA, RBAC, and real-time notifications. Built with Next.js, Express, and MongoDB.",
            tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
            image: "https://images.unsplash.com/photo-1501503060800-3fa87a55ffb8?auto=format&fit=crop&q=80&w=800",
            demo: "#",
            github: "#",
        },
        {
            title: "CryptoTracker Pro",
            description: "Real-time cryptocurrency analytics platform with glassmorphic UI and deep charting capabilities.",
            tags: ["React", "D3.js", "Firebase", "CSS Modules"],
            image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800",
            demo: "#",
            github: "#",
        },
        {
            title: "Nexus Portfolio Engine",
            description: "A premium, dynamic portfolio system featuring a custom CMS, secure admin dashboard, and high-performance SSR.",
            tags: ["Next.js", "Prisma", "PostgreSQL", "Framer Motion"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
            demo: "#",
            github: "#",
        }
    ];

    for (const p of projects) {
        try {
            await prisma.project.create({ data: p });
            console.log(`✅ Project "${p.title}" seeded.`);
        } catch (error) {
            console.error(`❌ Project "${p.title}" seed failed:`, error);
        }
    }

    // 3. Create Blog Posts
    const blogPosts = [
        {
            title: "The Art of Scalable Web Architecture",
            excerpt: "How to design systems that handle growth without breaking. Lessons from EduNova.",
            content: "Full content would go here...",
            category: "Architecture",
            readTime: "10 min read",
            published: true,
        },
        {
            title: "Design Systems in the Modern Web",
            excerpt: "Building consistent, high-performance UIs using Tailwind CSS and Framer Motion.",
            content: "Full content would go here...",
            category: "Design",
            readTime: "8 min read",
            published: true,
        }
    ];

    for (const b of blogPosts) {
        try {
            await prisma.blogPost.create({ data: b });
            console.log(`✅ Blog Post "${b.title}" seeded.`);
        } catch (error) {
            console.error(`❌ Blog Post "${b.title}" seed failed:`, error);
        }
    }
}

main()
    .catch((e) => {
        console.error("Critical seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
