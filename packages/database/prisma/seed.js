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
                phone: "6006121193",
                userId: "admin-001",
            },
        });
        console.log("✅ Admin seeded.");
    } catch (error) {
        console.error("❌ Admin seed failed:", error);
    }

    // 2. Clear existing projects to avoid duplicates
    try {
        await prisma.project.deleteMany();
        console.log("🧹 Cleared existing projects.");
    } catch (error) {
        console.error("❌ Failed to clear projects:", error);
    }

    // 3. Create Flagship Projects
    const projects = [
        {
            title: "Edunova",
            summary: "Enterprise-grade SaaS for academic orchestration and real-time institutional management.",
            description: "A comprehensive School Management System with 2FA, RBAC, and real-time notifications. Designed to handle thousands of concurrent users with zero-latency overhead.",
            status: "Production",
            role: "Full Stack Architect",
            tags: ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
            image: "https://images.unsplash.com/photo-1501503060800-3fa87a55ffb8?auto=format&fit=crop&q=80&w=1200",
            demo: "https://edunova-saas.vercel.app",
            github: "https://github.com/kumail-kmr25/Edunova-saas.git",
            problem: "Educational institutions struggled with fragmented data, manual attendance tracking, and insecure grade management systems.",
            solution: "Built a unified platform that centralizes student lifecycle management, from admission to graduation, with automated reporting.",
            targetAudience: "K-12 Schools, Universities, and Corporate Training Centers.",
            valueProp: "Reduces administrative overhead by 40% through automated workflow orchestration.",
            challenges: "Syncing real-time attendance across 50+ classrooms simultaneously without overloading the database connection pool.",
            engineering: "Implemented a hybrid caching strategy using Next.js unstable_cache and database-level indexing for high-frequency queries.",
            performance: "Database query optimization reduced average response time from 450ms to 42ms.",
            scalability: "Stateless architecture allows horizontal scaling across Vercel's global edge network.",
            security: "Multi-factor authentication (MFA) and granular Role-Based Access Control (RBAC) ensure data integrity.",
            lessons: "Learned that database schema design is the most critical part of long-term project stability.",
            uiDepth: 85,
            backendDepth: 95,
            securityDepth: 90,
            scalabilityDepth: 88,
            architecture: {
                nodes: [
                    { id: "ui", label: "Frontend", sub: "Next.js 15 App Router", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "API Layer", sub: "Route Handlers / Zod", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Database", sub: "PostgreSQL / Prisma", icon: "Database", color: "green", x: 70, y: 35 },
                    { id: "auth", label: "Auth", sub: "Clerk / JWT", icon: "Lock", color: "amber", x: 40, y: 70 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "tRPC / REST" },
                    { from: "api", to: "db", label: "Type-safe Queries" },
                    { from: "ui", to: "auth", label: "Session Mgmt" }
                ]
            }
        },
        {
            title: "MedCipher",
            summary: "Next-gen healthcare data management with strictly audited clinical workflows.",
            description: "A secure medical record system (EMR) focusing on data privacy and rapid clinical data entry. Built for performance in high-stakes environments.",
            status: "Beta",
            role: "Backend Lead",
            tags: ["JavaScript", "React.js", "MongoDB", "Express", "Node.js"],
            image: "https://images.unsplash.com/photo-1576091160550-2173599211d0?auto=format&fit=crop&q=80&w=1200",
            demo: "#",
            github: "#",
            problem: "Clinicians spend 30% of their day on data entry, leading to burnout and potential errors in patient records.",
            solution: "Developed an intuitive UI with predictive data entry and a robust MongoDB backend for flexible medical schemas.",
            targetAudience: "Private clinics and diagnostic laboratories.",
            valueProp: "Increases patient throughput by streamlining the documentation process.",
            challenges: "Handling complex, nested medical histories while maintaining search speed across millions of records.",
            engineering: "Built a custom aggregation pipeline in MongoDB to generate real-time patient health trends.",
            performance: "Implemented client-side optimistic UI updates for a zero-lag user experience.",
            scalability: "Database sharding prepared for multi-regional deployment.",
            security: "End-to-end encryption for patient PII (Personally Identifiable Information).",
            lessons: "The importance of UX in technical products—if doctors can't use it quickly, the tech doesn't matter.",
            uiDepth: 80,
            backendDepth: 90,
            securityDepth: 95,
            scalabilityDepth: 85,
            architecture: {
                nodes: [
                    { id: "ui", label: "Frontend", sub: "React / Vite", icon: "Monitor", color: "cyan", x: 10, y: 35 },
                    { id: "api", label: "Backend", sub: "Node / Express", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Storage", sub: "MongoDB Atlas", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "RESTful API" },
                    { from: "api", to: "db", label: "Mongoose ODM" }
                ]
            }
        },
        {
            title: "ValeKash",
            summary: "High-velocity fintech solution for seamless digital asset transactions and escrow.",
            description: "A secure payment processing and digital wallet platform. Focused on transaction atomicity and financial security standards.",
            status: "Concept",
            role: "System Architect",
            tags: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS"],
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
            demo: "#",
            github: "#",
            problem: "Trust issues in peer-to-peer digital transactions and lack of transparent escrow mechanisms.",
            solution: "Architecture of an automated escrow system that holds funds until technical verification of delivery.",
            targetAudience: "Freelancers and digital product marketplaces.",
            valueProp: "Guarantees payment safety through algorithmic verification.",
            challenges: "Ensuring transaction atomicity—preventing partial failures where money is moved but not recorded.",
            engineering: "Utilized PostgreSQL serializable isolation levels to prevent race conditions during heavy traffic.",
            performance: "Built an internal ledger system optimized for sub-millisecond balance checks.",
            scalability: "Designed for microservices split as the transaction volume grows.",
            security: "Hardware security module (HSM) integration simulated for key management.",
            lessons: "Financial systems require a 'failure-first' mindset—everything must be reversible and logged.",
            uiDepth: 75,
            backendDepth: 98,
            securityDepth: 98,
            scalabilityDepth: 92,
            architecture: {
                nodes: [
                    { id: "ui", label: "Frontend", sub: "Next.js 15 UI", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "Fin-API", sub: "Fastify / Node", icon: "Server", color: "rose", x: 40, y: 35 },
                    { id: "db", label: "Ledger", sub: "PostgreSQL (ACID)", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "Secure WebSocket" },
                    { from: "api", to: "db", label: "Atomic Transactions" }
                ]
            }
        },
        {
            title: "FinFlow AI",
            summary: "AI-driven financial analytics engine for predictive budgeting and treasury management.",
            description: "An intelligent platform that uses machine learning to categorize expenses and predict future cash flow trends. Built for precision.",
            status: "Production",
            role: "Lead Developer",
            tags: ["JavaScript", "React.js", "MongoDB", "Tailwind CSS"],
            image: "https://images.unsplash.com/photo-1551288049-bbbda5366a7a?auto=format&fit=crop&q=80&w=1200",
            demo: "#",
            github: "#",
            problem: "SMEs struggle to predict their runway due to inconsistent financial tracking and varying expense cycles.",
            solution: "Integrated OpenAI API for intelligent transaction categorization and trend analysis.",
            targetAudience: "Small to Medium Enterprises and Startups.",
            valueProp: "Provides 95% accurate cash-flow predictions 3 months in advance.",
            challenges: "Cleaning and normalizing messy transaction data from multiple bank sources.",
            engineering: "Built a background worker system to process AI tasks without blocking the main event loop.",
            performance: "Reduced frontend render time for data-heavy charts by 60% using virtualization.",
            scalability: "Stateless API ensures it can handle rapid increases in data volume.",
            security: "Strict data isolation policies ensure no company can see another's private financial records.",
            lessons: "AI is only as good as the data cleaning pipeline before it.",
            uiDepth: 90,
            backendDepth: 85,
            securityDepth: 88,
            scalabilityDepth: 80,
            architecture: {
                nodes: [
                    { id: "ui", label: "Frontend", sub: "React / Shadcn UI", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "API", sub: "Node.js Core", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "ai", label: "AI Engine", sub: "OpenAI / Python", icon: "Cpu", color: "amber", x: 40, y: 70 },
                    { id: "db", label: "Insights", sub: "MongoDB", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "JSON API" },
                    { from: "api", to: "ai", label: "Prompt Engineering" },
                    { from: "api", to: "db", label: "Insight Storage" }
                ]
            }
        },
        {
            title: "Clinkart",
            summary: "High-performance E-commerce engine for modern retail and rapid scaling.",
            description: "A headless e-commerce solution with extreme focus on SEO, core web vitals, and conversion optimization. Built for high-traffic sales.",
            status: "Production",
            role: "Full Stack Developer",
            tags: ["JavaScript", "React.js", "MongoDB", "Next.js"],
            image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200",
            demo: "#",
            github: "#",
            problem: "Legacy e-commerce platforms are slow, dragging down Google rankings and conversion rates.",
            solution: "Engineered a headless commerce stack that achieves a 100/100 Lighthouse score.",
            targetAudience: "D2C Brands and specialized online retailers.",
            valueProp: "Boosts search visibility by 50% through hyper-optimized technical SEO.",
            challenges: "Managing inventory levels in real-time across high-traffic global flash sales.",
            engineering: "Developed a distributed locking mechanism to prevent overselling during peak load.",
            performance: "Image optimization pipeline reduces payload size by 70% while maintaining 4k quality.",
            scalability: "Serverless functions used for non-critical paths to reduce main server load.",
            security: "PCI-compliant payment integration using secure stripe-connect architecture.",
            lessons: "Performance is a feature—every 100ms of delay costs real revenue.",
            uiDepth: 95,
            backendDepth: 88,
            securityDepth: 85,
            scalabilityDepth: 90,
            architecture: {
                nodes: [
                    { id: "ui", label: "Storefront", sub: "React / Next.js", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "Orders", sub: "Node / GraphQL", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Catalog", sub: "MongoDB / Redis", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "GraphQL Queries" },
                    { from: "api", to: "db", label: "Cache-aside Pattern" }
                ]
            }
        },
        {
            title: "Quebook",
            summary: "Collaborative technical documentation platform for engineering-heavy teams.",
            description: "A documentation engine that supports markdown, live code samples, and complex system diagrams. Built for clarity and speed.",
            status: "Beta",
            role: "Frontend Engineer",
            tags: ["TypeScript", "Next.js", "MongoDB", "Framer Motion"],
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
            demo: "#",
            github: "#",
            problem: "Traditional documentation tools are disconnected from the actual codebase and architecture.",
            solution: "Created a platform that syncs with GitHub repos to pull technical specs and build docs automatically.",
            targetAudience: "DevOps teams and Software Architects.",
            valueProp: "Keeps documentation 100% in sync with code through automated CI/CD pulls.",
            challenges: "Building a performant markdown-to-React compiler that supports interactive code blocks.",
            engineering: "Leveraged AST-based parsing to identify and render technical diagrams from text definitions.",
            performance: "Implemented static site generation (SSG) with ISR for instantaneous document loads.",
            scalability: "Designed to handle versioned documentation for hundreds of independent modules.",
            security: "GitHub OAuth integration for secure team-based access control.",
            lessons: "Technical users value speed and searchability over fancy visuals.",
            uiDepth: 85,
            backendDepth: 85,
            securityDepth: 80,
            scalabilityDepth: 85,
            architecture: {
                nodes: [
                    { id: "ui", label: "Reader", sub: "Next.js Static", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "Parsers", sub: "Edge Functions", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Storage", sub: "MongoDB / S3", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "Markdown fetch" },
                    { from: "api", to: "db", label: "AST caching" }
                ]
            }
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

    // 4. Create Blog Posts
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

    // 5. Create Journey Phases
    try {
        await prisma.journeyPhase.deleteMany();
        console.log("🧹 Cleared existing Journey Phases.");
    } catch (error) {
        console.error("❌ Failed to clear Journey Phases:", error);
    }

    const phases = [
        {
            phase: "Step 1",
            title: "Foundation & Core Engineering",
            description: "Established a robust engineering foundation, mastering modern web architectures and production-ready system designs.",
            icon: "Brain",
            color: "from-blue-500/20 to-indigo-500/20",
            order: 1
        },
        {
            phase: "Step 2",
            title: "Full-Stack Orchestration",
            description: "Developed deep expertise in full-stack orchestration, integrating advanced database systems and secure authentication layers.",
            icon: "Code2",
            color: "from-indigo-500/20 to-purple-500/20",
            order: 2
        },
        {
            phase: "Step 3",
            title: "Architectural Scalability",
            description: "Architected high-performance applications with a focus on scalability, cloud infrastructure, and automated delivery pipelines.",
            icon: "Cpu",
            color: "from-purple-500/20 to-pink-500/20",
            order: 3
        },
        {
            phase: "Step 4",
            title: "Strategic Innovation",
            description: "Leading next-gen digital initiatives with hyper-optimized system flows and strategic technical direction.",
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

    // 6. Create Skills
    try {
        await prisma.skill.deleteMany();
        console.log("🧹 Cleared existing skills.");
    } catch (error) {
        console.error("❌ Failed to clear skills:", error);
    }

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
