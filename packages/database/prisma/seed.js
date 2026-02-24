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
                name: "Kumail",
                phone: "0000000000",
                userId: "admin-001",
            },
        });
        console.log("✅ Admin seeded.");
    } catch (error) {
        console.error("❌ Admin seed failed:", error);
    }

    // 2. Create Projects
    const projects = [
        {
            title: "School Management System",
            description: "A comprehensive School Management System with 2FA, RBAC, and real-time notifications. Built with Next.js, Express, and MongoDB.",
            tags: ["Next.js", "Express", "MongoDB", "Tailwind CSS"],
            image: "https://images.unsplash.com/photo-1501503060800-3fa87a55ffb8?auto=format&fit=crop&q=80&w=800",
            demo: "#",
            github: "https://github.com/kumail-kmr25/Edunova-saas.git",
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
            excerpt: "How to design systems that handle growth without breaking.",
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

    // 4. Create Journey Phases
    const phases = [
        {
            phase: "Phase 1",
            title: "Curiosity",
            description: "First exposure to tech. Exploring how websites work and understanding the magic behind the browser.",
            icon: "Brain",
            color: "from-blue-500/20 to-indigo-500/20",
            order: 1
        },
        {
            phase: "Phase 2",
            title: "Learning by Building",
            description: "Built small projects. Learned frontend & backend fundamentals. Fixed real bugs and understood documentation.",
            icon: "Code2",
            color: "from-indigo-500/20 to-purple-500/20",
            order: 2
        },
        {
            phase: "Phase 3",
            title: "Real Engineering",
            description: "Built full-stack systems, authentication systems, and optimized database architecture for performance.",
            icon: "Cpu",
            color: "from-purple-500/20 to-pink-500/20",
            order: 3
        },
        {
            phase: "Phase 4",
            title: "Now",
            description: "Focused on real-world problem solving. Freelancing & internships. Shipping production-ready code for global users.",
            icon: "Rocket",
            color: "from-pink-500/20 to-blue-500/20",
            order: 4
        }
    ];

    for (const p of phases) {
        try {
            await prisma.journeyPhase.create({ data: p });
            console.log(`✅ Journey Phase "${p.title}" seeded.`);
        } catch (error) {
            console.error(`❌ Journey Phase "${p.title}" seed failed:`, error);
        }
    }

    // 5. Create Skills
    const skills = [
        { name: "React.js", status: "expert", order: 1 },
        { name: "Next.js", status: "expert", order: 2 },
        { name: "TypeScript", status: "expert", order: 3 },
        { name: "Node.js", status: "expert", order: 4 },
        { name: "Express", status: "expert", order: 5 },
        { name: "JavaScript", status: "expert", order: 6 },
        { name: "MongoDB / PostgreSQL", status: "expert", order: 7 },
        { name: "JWT Auth", status: "expert", order: 8 },
        { name: "Deployment", status: "expert", order: 9 },
        { name: "DevOps", status: "learning", order: 10 },
        { name: "Cloud", status: "learning", order: 11 }
    ];

    for (const s of skills) {
        try {
            await prisma.skill.create({ data: s });
            console.log(`✅ Skill "${s.name}" seeded.`);
        } catch (error) {
            console.error(`❌ Skill "${s.name}" seed failed:`, error);
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
