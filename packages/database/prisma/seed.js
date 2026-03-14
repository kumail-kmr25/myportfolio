const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("!!! DEBUG: EXECUTING REFINED SEED VERSION 2.0 !!!");
    console.log("Starting seed process...");

    // 1. Create Admin
    const adminEmail = "ka6307464@gmail.com";
    const hashedPassword = "$2b$12$mZWl6IrG1SR3Cur.hxVL.22ciZl.64GTDk.C2kEh"; // KUMAIL@admin25?.

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

    // 2. Clear existing data
    try {
        await prisma.project.deleteMany();
        await prisma.blogPost.deleteMany();
        await prisma.journeyPhase.deleteMany();
        await prisma.skill.deleteMany();
        await prisma.caseStudy.deleteMany();
        await prisma.issuePattern.deleteMany();
        await prisma.siteStats.deleteMany();
        console.log("🧹 Cleared existing data.");
    } catch (error) {
        console.error("❌ Failed to clear data:", error);
    }

    // 3. Create Flagship Projects
    const projects = [
        {
            title: "CUE AI",
            isVisible: true,
            isFeatured: true,
            summary: "Advanced AI-powered conversational engine and reasoning system.",
            description: "A sophisticated AI platform leveraging large language models for deep contextual reasoning, semantic search, and intelligent automation workflows. Built with a focus on low-latency inference and high-dimensional vector similarity.",
            status: "Production",
            role: "Lead Architect",
            tags: ["Next.js", "Python", "FastAPI", "Vector DB", "Tailwind"],
            image: "/projects/cue_ai.png",
            demo: "#",
            github: "#",
            problem: "Teams waste hours on repetitive information lookup and context-switching between multiple tools.",
            solution: "Built a unified AI assistant that integrates with team workflows and learns from organizational context to provide relevant, accurate answers.",
            targetAudience: "Technology teams, product managers, and knowledge workers.",
            valueProp: "Reduces context-switching by 60% through intelligent workflow integration.",
            challenges: "Maintaining conversation context across long sessions while keeping token usage efficient.",
            engineering: "Implemented a sliding context window with semantic compression using embeddings to retain relevant context.",
            performance: "Response streaming reduces perceived latency by 80% using Vercel AI SDK.",
            metrics: ["80% Faster Responses", "70% Token Reduction", "60% Less Context Switching"],
            uiDepth: 88,
            backendDepth: 95,
            securityDepth: 90,
            scalabilityDepth: 92,
            architecture: {
                nodes: [
                    { id: "ui", label: "Chat UI", sub: "Next.js / Vercel AI SDK", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "AI Gateway", sub: "Node / OpenAI API", icon: "Cpu", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Context", sub: "PostgreSQL / pgvector", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "Streaming SSE" },
                    { from: "api", to: "db", label: "Vector Retrieval" }
                ]
            }
        },
        {
            title: "MedQ AI",
            isVisible: true,
            isFeatured: true,
            summary: "Next-gen healthcare data management with strictly audited clinical workflows.",
            description: "A secure medical record system (EMR) focusing on data privacy and rapid clinical data entry. Built for performance in high-stakes environments with HIPAA-compliant standards.",
            status: "Beta",
            role: "Backend Lead",
            tags: ["React.js", "MongoDB", "Express", "Node.js"],
            image: "/projects/medq_ai.png",
            demo: "https://gemini-med.vercel.app/",
            github: "https://github.com/kumail-kmr25/Que-med.git",
            problem: "Clinicians spend 30% of their day on data entry, leading to burnout and potential errors in patient records.",
            solution: "Developed an intuitive UI with predictive data entry and a robust MongoDB backend for flexible medical schemas.",
            targetAudience: "Private clinics and diagnostic laboratories.",
            valueProp: "Increases patient throughput by streamlining the documentation process.",
            challenges: "Handling complex, nested medical histories while maintaining search speed across millions of records.",
            engineering: "Built a custom aggregation pipeline in MongoDB to generate real-time patient health trends.",
            performance: "Implemented client-side optimistic UI updates for a zero-lag user experience, reducing perceived latency by 200%.",
            metrics: ["-85% DB Latency", "99.9% Data Integrity", "4x Data Entry Speed"],
            uiDepth: 80,
            backendDepth: 90,
            securityDepth: 95,
            scalabilityDepth: 85,
            architecture: {
                nodes: [
                    { id: "ui", label: "Frontend", sub: "React / Vite / Tailwind", icon: "Monitor", color: "cyan", x: 10, y: 35 },
                    { id: "api", label: "Backend", sub: "Node / Express / PM2", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Storage", sub: "MongoDB Atlas Cluster", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "REST / Socket.io" },
                    { from: "api", to: "db", label: "Mongoose ODM" }
                ]
            }
        },
        {
            title: "EduNova",
            isVisible: true,
            summary: "Enterprise-grade SaaS for academic orchestration and real-time institutional management.",
            description: "A comprehensive School Management System with 2FA, RBAC, and real-time notifications. Designed to handle thousands of concurrent users with zero-latency overhead.",
            status: "Production",
            role: "Full Stack Architect",
            tags: ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
            image: "/projects/edunova.png",
            demo: "https://edunova-saas.vercel.app",
            github: "https://github.com/kumail-kmr25/Edunova-saas.git",
            problem: "Educational institutions struggled with fragmented data, manual attendance tracking, and insecure grade management systems.",
            solution: "Built a unified platform that centralizes student lifecycle management, from admission to graduation, with automated reporting.",
            targetAudience: "K-12 Schools, Universities, and Corporate Training Centers.",
            valueProp: "Reduces administrative overhead by 40% through automated workflow orchestration.",
            metrics: ["-90% Server Load", "450ms -> 42ms TTFB", "40% Admin Efficiency"],
            uiDepth: 85,
            backendDepth: 95,
            securityDepth: 90,
            scalabilityDepth: 88,
            architecture: {
                nodes: [
                    { id: "ui", label: "Frontend", sub: "Next.js 15 App Router", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "API Layer", sub: "Route Handlers / Zod", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Database", sub: "PostgreSQL / Prisma", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "tRPC / REST" },
                    { from: "api", to: "db", label: "Type-safe Queries" }
                ]
            }
        },
        {
            title: "BAB E ILM",
            isVisible: true,
            summary: "Digital knowledge repository and comprehensive educational portal.",
            description: "A centralized platform for accessing structured educational content, featuring advanced search and categorizations. Built for scalability and accessibility in educational environments.",
            status: "Production",
            role: "Full Stack Developer",
            tags: ["React.js", "Node.js", "PostgreSQL", "Tailwind"],
            image: "/projects/babeilm.png",
            demo: "#",
            github: "#",
            problem: "Fragmentation of educational resources makes it difficult for students to find high-quality, structured information.",
            solution: "Created a unified knowledge hub with semantic search and intuitive hierarchical content organization.",
            targetAudience: "Students, Educators, and Researchers.",
            valueProp: "Simplifies information retrieval through a structured knowledge architecture.",
            challenges: "Managing massive volumes of unstructured educational data and providing fast, relevant search results.",
            engineering: "Implemented a custom indexing strategy in PostgreSQL and a clean, responsive React frontend for multi-device support.",
            metrics: ["98% Search Accuracy", "30% Faster Research Time", "100+ Categories Mapped"],
            uiDepth: 80,
            backendDepth: 88,
            securityDepth: 85,
            scalabilityDepth: 90,
            architecture: {
                nodes: [
                    { id: "ui", label: "Portal", sub: "React / Vite", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "Backend", sub: "Node / Express", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Archive", sub: "PostgreSQL", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "REST" },
                    { from: "api", to: "db", label: "Indexed Queries" }
                ]
            }
        },
        {
            title: "ValeKash",
            isVisible: true,
            summary: "High-velocity fintech solution for seamless digital asset transactions and escrow.",
            description: "A secure payment processing and digital wallet platform focusing on transaction atomicity and high financial security standards.",
            status: "Concept",
            role: "System Architect",
            tags: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS"],
            image: "/projects/valekash.png",
            demo: "https://valekash.vercel.app/",
            github: "https://github.com/kumail-kmr25/ValeKash-Final.git",
            problem: "Trust issues in peer-to-peer digital transactions and lack of transparent escrow mechanisms.",
            solution: "Designed an automated escrow system that holds funds until technical verification of delivery.",
            targetAudience: "Freelancers and digital product marketplaces.",
            metrics: ["0% Double Spend", "1ms Ledger Latency", "99.9% Security Audit"],
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
            title: "NESTQ AI",
            isVisible: true,
            summary: "AI-driven financial analytics engine for predictive budgeting and treasury management.",
            description: "An intelligent platform that uses machine learning to categorize expenses and predict future cash flow trends. Formerly known as FinFlow AI.",
            status: "Production",
            role: "Lead Developer",
            tags: ["React.js", "MongoDB", "Node.js", "Tailwind"],
            image: "/projects/finflow.png",
            demo: "#",
            github: "#",
            problem: "SMEs struggle to predict their runway due to inconsistent financial tracking and varying expense cycles.",
            solution: "Integrated AI categorization models to normalize messy transaction data and generate high-precision forecasts.",
            metrics: ["95% Prediction Accuracy", "60% Render Speedup", "30% Lower API Costs"],
            uiDepth: 90,
            backendDepth: 85,
            securityDepth: 88,
            scalabilityDepth: 80,
            architecture: {
                nodes: [
                    { id: "ui", label: "Frontend", sub: "React / Shadcn UI", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "Core", sub: "Fastify / Node", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Stats", sub: "MongoDB Atlas", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "REST" },
                    { from: "api", to: "db", label: "Aggregations" }
                ]
            }
        },
        {
            title: "Clinkart",
            isVisible: true,
            summary: "High-performance E-commerce engine for modern retail and rapid scaling.",
            description: "A headless e-commerce solution with extreme focus on SEO, core web vitals, and conversion optimization. Built for high-traffic retail flows.",
            status: "Production",
            role: "Full Stack Developer",
            tags: ["Next.js", "React.js", "MongoDB", "Tailwind"],
            image: "/projects/clinkart.png",
            demo: "#",
            github: "#",
            metrics: ["100/100 Lighthouse", "15% Conversion Boost", "70% Payload Reduction"],
            uiDepth: 95,
            backendDepth: 88,
            securityDepth: 85,
            scalabilityDepth: 90,
            architecture: {
                nodes: [
                    { id: "ui", label: "Storefront", sub: "Next.js Headless", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "api", label: "Orders", sub: "GraphQL / Node", icon: "Server", color: "purple", x: 40, y: 35 },
                    { id: "db", label: "Products", sub: "MongoDB", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "api", label: "GraphQL" },
                    { from: "api", to: "db", label: "Query Optimization" }
                ]
            }
        },
        {
            title: "Quebook",
            isVisible: true,
            summary: "Collaborative technical documentation platform for engineering-heavy teams.",
            description: "A documentation engine that supports markdown, live code samples, and complex system diagrams. Integrated with GitHub workflows.",
            status: "Beta",
            role: "Frontend Engineer",
            tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind"],
            image: "/projects/quebook.png",
            demo: "#",
            github: "#",
            metrics: ["0ms Navigation Delay", "100% SEO Score", "50+ Microservices Configured"],
            uiDepth: 85,
            backendDepth: 85,
            securityDepth: 80,
            scalabilityDepth: 85,
            architecture: {
                nodes: [
                    { id: "ui", label: "Docs App", sub: "Next.js Static", icon: "Monitor", color: "blue", x: 10, y: 35 },
                    { id: "db", label: "Vault", sub: "MongoDB Atlas", icon: "Database", color: "green", x: 70, y: 35 }
                ],
                edges: [
                    { from: "ui", to: "db", label: "Static Access" }
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
            title: "Architecting for Scale: Lessons from 1M+ Transactions",
            excerpt: "Exploring the distributed locking patterns and cache-aside strategies used to build the FinFlow AI engine.",
            content: "Full technical breakdown of the transaction engine architecture...",
            category: "Engineering",
            readTime: "12 min read",
            published: true
        },
        {
            title: "The Forensic Developer: Debugging as a Science",
            excerpt: "How to use heap snapshots, flame graphs, and trace logs to isolate intermittent production failures.",
            content: "Detailed guide on forensic debugging methodologies...",
            category: "Methodology",
            readTime: "8 min read",
            published: true
        },
        {
            title: "Next.js 15: Pushing the Limits of Hybrid Rendering",
            excerpt: "A deep dive into PPR (Partial Prerendering) and the evolution of the App Router for enterprise applications.",
            content: "Analysis of the latest Next.js features and their impact on performance...",
            category: "Development",
            readTime: "10 min read",
            published: true
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
    const skills = [
        { name: "TypeScript", status: "expert", order: 1 },
        { name: "Next.js", status: "expert", order: 2 },
        { name: "Node.js", status: "expert", order: 3 },
        { name: "PostgreSQL", status: "expert", order: 4 },
        { name: "MongoDB", status: "expert", order: 5 },
        { name: "Prisma", status: "expert", order: 6 },
        { name: "React", status: "expert", order: 7 },
        { name: "Tailwind CSS", status: "expert", order: 8 },
        { name: "Framer Motion", status: "expert", order: 9 },
        { name: "Redis", status: "expert", order: 12 }
    ];

    for (const s of skills) {
        try {
            await prisma.skill.create({ data: s });
            console.log(`✅ Skill "${s.name}" seeded.`);
        } catch (error) {
            console.error(`❌ Skill "${s.name}" seed failed:`, error);
        }
    }

    // 7. Forensic Case Studies (Debugging)
    const forensicCases = [
        {
            title: "Memory Leak in Real-time Inventory",
            errorMessage: "FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory",
            rootCause: "Unbounded event listener accumulation in a long-running WebSocket subscription during frequent reconnections.",
            steps: [
                "Captured heap snapshots using Chrome DevTools during local stress testing.",
                "Identified thousands of abandoned AbortController instances.",
                "Isolated the leak to the useEventListener hook's cleanup logic."
            ],
            solution: "Implemented a defensive cleanup pattern using WeakMap to track active controllers and enforced manual disposal on socket disconnect.",
            impact: "Stable memory footprint (60MB) sustained over 48 hours of continuous operation under load.",
            techStack: ["Node.js", "Socket.io", "React", "Chrome DevTools"],
            isPublished: true
        },
        {
            title: "Race Condition in Fin-Transaction Engine",
            errorMessage: "SQL Error: deadlock detected. Detail: Process 12345 waits for ShareLock on transaction 6789...",
            rootCause: "Inconsistent lock ordering across multiple microservices attempting to update the same ledger entry simultaneously.",
            steps: [
                "Map out all SQL update paths to identify intersecting ledger IDs.",
                "Enabled exhaustive Postgres logging to capture the exact deadlock sequence.",
                "Designed a deterministic locking order based on account UUIDs."
            ],
            solution: "Applied a 'Locking Hierarchy' where resources are always acquired in alphabetical order of their identifiers, preventing circular wait conditions.",
            impact: "Zero deadlock occurrences recorded in production over 1M+ transactions.",
            techStack: ["PostgreSQL", "Prisma", "TypeScript", "Microservices"],
            isPublished: true
        }
    ];

    for (const c of forensicCases) {
        try {
            await prisma.caseStudy.create({ data: c });
            console.log(`✅ Case Study "${c.title}" seeded.`);
        } catch (error) {
            console.error(`❌ Case Study "${c.title}" seed failed:`, error);
        }
    }

    // 8. Issue Patterns (Diagnostic Engine)
    const patterns = [
        {
            keywords: ["cors", "access-control-allow-origin", "blocked"],
            possibleCauses: ["Missing CORS middleware in Express", "Incorrect origin whitelist", "Preflight request (OPTIONS) not handled"],
            debugSteps: ["Verify the 'Origin' header in the request", "Check if the server matches the exact protocol and port", "Ensure 'credentials: include' is set if using cookies"],
            complexity: "Low",
            recommendedService: "Backend Debugging"
        },
        {
            keywords: ["hydration", "mismatch", "server-side", "client-side"],
            possibleCauses: ["Accessing window/document in a Server Component", "Timezone/Date discrepancies between server and browser", "Browser extensions injecting HTML"],
            debugSteps: ["Wrap browser-only code in useEffect", "Use 'suppressHydrationWarning' for unavoidable text mismatches", "Disable extensions and check again"],
            complexity: "Medium",
            recommendedService: "Next.js Optimization"
        }
    ];

    for (const p of patterns) {
        try {
            await prisma.issuePattern.create({ data: p });
            console.log(`✅ Issue Pattern seeded.`);
        } catch (error) {
            console.error(`❌ Issue Pattern seed failed:`, error);
        }
    }

    // 9. Initial Site Stats
    try {
        await prisma.siteStats.create({
            data: {
                totalProjects: 6,
                bugsFixed: 142,
                caseStudiesWritten: 2,
                featureRequestsCompleted: 0,
                yearsLearning: 2,
                deploymentCount: 102
            }
        });
        console.log("✅ Site Stats seeded.");
    } catch (error) {
        console.error("❌ Site Stats seed failed:", error);
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
