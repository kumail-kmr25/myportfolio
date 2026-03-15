const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding Eco-Friendly Journey Data...");

    // 1. Clear existing journey data (Order matters for foreign keys)
    try {
        console.log("Cleaning up existing data...");
        await prisma.journeyFutureGoal.deleteMany();
        await prisma.journeyMilestone.deleteMany();
        await prisma.journeyStep.deleteMany();
        await prisma.journeyPhase.deleteMany();
        await prisma.journeyConfig.deleteMany();
        console.log("✅ Data cleanup complete.");
    } catch (error) {
        console.warn("⚠️ Cleanup warning (might be first run):", error.message);
    }

    // 2. Journey Configuration
    const config = await prisma.journeyConfig.create({
        data: {
            enabled: true,
            theme: "tree",
            title: "Professional Development Path",
            subtitle: "Every line of code planted a seed. Every architecture grew a branch.",
            backgroundColor: "#050505",
            primaryColor: "#3b82f6",
            accentColor: "#8b5cf6",
            enableAnimations: true,
            layout: "vertical"
        }
    });
    console.log("✅ Journey Config seeded.");

    // 3. Journey Phases
    const phases = [
        {
            title: "The Seed",
            subtitle: "Foundation & First Lines",
            ecoIcon: "🌱",
            ecoStage: "seed",
            dateRange: "2017 - 2019",
            year: 2017,
            order: 1,
            steps: {
                create: [
                    {
                        title: "Mastered HTML & CSS",
                        description: "The very first layer of building for the web. Learned the semantics of structure and the art of styling.",
                        icon: "🍃",
                        category: "education",
                        technologies: ["HTML5", "CSS3", "Responsive Design"]
                    },
                    {
                        title: "JavaScript Fundamentals",
                        description: "Breathed life into static pages. Mastered DOM manipulation and basic logic flows.",
                        icon: "💧",
                        category: "skill",
                        technologies: ["ES6+", "Vanilla JS"]
                    }
                ]
            }
        },
        {
            title: "The Sprout",
            subtitle: "Full-Stack Emergence",
            ecoIcon: "🌿",
            ecoStage: "sprout",
            dateRange: "2020 - 2021",
            year: 2020,
            order: 2,
            steps: {
                create: [
                    {
                        title: "React Ecosystem",
                        description: "Adopted component-based architecture. Learned state management and declarative UI patterns.",
                        icon: "🎋",
                        category: "skill",
                        technologies: ["React", "Redux", "Hooks"]
                    },
                    {
                        title: "Backend Foundations",
                        description: "Started building servers and managing data. Discovered the power of Node.js and NoSQL.",
                        icon: "🪵",
                        category: "skill",
                        technologies: ["Node.js", "Express", "MongoDB"]
                    }
                ]
            }
        },
        {
            title: "The Sapling",
            subtitle: "Architectural Strengthening",
            ecoIcon: "🌳",
            ecoStage: "sapling",
            dateRange: "2022 - 2023",
            year: 2022,
            order: 3,
            steps: {
                create: [
                    {
                        title: "Enterprise Architecture",
                        description: "Shifted focus to scalability and type safety. Implementing production-grade systems with Next.js.",
                        icon: "🏗️",
                        category: "project",
                        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"]
                    },
                    {
                        title: "Security & DevOps",
                        description: "Ensuring applications are resilient and automated. Mastering deployments and secure data handling.",
                        icon: "🛡️",
                        category: "skill",
                        technologies: ["Docker", "Vercel", "HIPAA Compliance", "RBAC"]
                    }
                ]
            }
        },
        {
            title: "The Fruit",
            subtitle: "Innovation & Leadership",
            ecoIcon: "🍎",
            ecoStage: "fruit",
            dateRange: "2024 - Present",
            year: 2024,
            order: 4,
            steps: {
                create: [
                    {
                        title: "AI Integration",
                        description: "Injecting intelligence into workflows. Building RAG pipelines and conversational logic.",
                        icon: "🧠",
                        category: "achievement",
                        technologies: ["OpenAI API", "Vector DBs", "LangChain"]
                    },
                    {
                        title: "Lead Architect Role",
                        description: "Directing technical visions and orchestrating cross-tier feature ecosystems.",
                        icon: "🚀",
                        category: "milestone",
                        technologies: ["System Design", "Technical Strategy"]
                    }
                ]
            }
        }
    ];

    for (const phaseData of phases) {
        await prisma.journeyPhase.create({ data: phaseData });
    }
    console.log("✅ Journey Phases and Steps seeded.");

    // 4. Milestones
    await prisma.journeyMilestone.createMany({
        data: [
            {
                title: "100+ Successful Deployments",
                description: "Reached a century of production-ready deployments across various industries.",
                date: new Date("2024-01-15"),
                icon: "🌸",
                celebration: "🎉 Major Bloom!",
                metric: "100+ Live Sites"
            },
            {
                title: "First AI SaaS Launch",
                description: "Successfully launched MedQ AI, a strictly audited healthcare data engine.",
                date: new Date("2023-11-20"),
                icon: "🌻",
                celebration: "✨ Growth Burst!",
                metric: "4x Efficiency Gain"
            }
        ]
    });
    console.log("✅ Journey Milestones seeded.");

    // 5. Future Goals
    await prisma.journeyFutureGoal.createMany({
        data: [
            {
                title: "Full-Stack Forest Expansion",
                description: "Mastering distributed systems and micro-frontend orchestrations.",
                targetDate: "2025",
                icon: "☀️",
                progress: 65,
                order: 1
            },
            {
                title: "Open Source Contribution Milestone",
                description: "Contributing core improvements to major web frameworks.",
                targetDate: "2026",
                icon: "🌍",
                progress: 40,
                order: 2
            }
        ]
    });
    console.log("✅ Journey Future Goals seeded.");
}

main()
    .catch((e) => {
        console.error("❌ Journey seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
