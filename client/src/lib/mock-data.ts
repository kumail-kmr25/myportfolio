import { Project } from "./types";

export const MOCK_PROJECTS: Project[] = [
    {
        id: "mock-cue-ai",
        title: "CUE AI",
        category: "Artificial Intelligence",
        isVisible: true,
        summary: "Advanced AI-powered conversational engine and reasoning system.",
        description: "A sophisticated AI platform leveraging large language models for deep contextual reasoning, semantic search, and intelligent automation workflows.",
        status: "Production",
        role: "Lead Architect",
        tags: ["Next.js", "Python", "FastAPI", "Vector DB", "Tailwind"],
        image: "/projects/cue_ai.png",
        demo: "#",
        github: "#",
        isFeatured: true,
        valuePoints: ["Deep contextual reasoning capabilities", "Vector-based semantic search", "Automated intelligent workflows"],
        metrics: ["Sub-500ms response time", "99.9% Uptime", "10k+ Daily Queries"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        systemArchitecture: [
            { name: "Frontend", value: "Next.js (App Router)" },
            { name: "Backend", value: "FastAPI (Python)" },
            { name: "Database", value: "PostgreSQL & Pinecone" },
            { name: "ORM/Querying", value: "SQLAlchemy" },
            { name: "Hosting", value: "Vercel & AWS EC2" }
        ],
        engineeringDecisions: [
            { 
                title: "Why FastAPI instead of Node.js for backend?", 
                reason: "Crucial for AI workloads.", 
                benefits: "Native support for Python's AI/ML ecosystem (LangChain, OpenAI SDK) and significantly faster async execution for vector computations." 
            },
            {
                title: "Why Pinecone alongside PostgreSQL?",
                reason: "Separation of concerns.",
                benefits: "PostgreSQL handles structured user/session data, while Pinecone specifically powers the high-dimensional vector similarity search necessary for the RAG pipeline."
            }
        ],
        codeSnippet: {
            language: "python",
            description: "Core RAG logic routing queries through the vector space.",
            code: `@app.post("/api/v1/query")\nasync def process_query(req: QueryRequest, db: Session = Depends(get_db)):\n    # 1. Generate local embedding\n    query_vector = await embedding_service.embed_text(req.prompt)\n    \n    # 2. Semantic search against Pinecone\n    context_matches = pinecone_index.query(\n        vector=query_vector, \n        top_k=5, \n        include_metadata=True\n    )\n    \n    # 3. Construct prompt & stream LLM response\n    context_text = "\\n".join([m.metadata['text'] for m in context_matches.matches])\n    return StreamingResponse(\n        llm_service.stream_inference(req.prompt, context_text),\n        media_type="text/event-stream"\n    )`
        },
        realStats: {
            components: "60+",
            apiRoutes: "24",
            models: "12",
            platform: "AWS + Vercel",
            buildTime: "8 Weeks"
        }
    },
    {
        id: "mock-medq-ai",
        title: "MedQ AI",
        category: "Healthcare",
        isVisible: true,
        summary: "Next-gen healthcare data management with strictly audited clinical workflows.",
        description: "A secure medical record system (EMR) focusing on data privacy and rapid clinical data entry.",
        status: "Beta",
        role: "Backend Lead",
        tags: ["React.js", "MongoDB", "Express", "Node.js"],
        image: "/projects/medq_ai.png",
        demo: "https://gemini-med.vercel.app/",
        github: "https://github.com/kumail-kmr25/Que-med.git",
        isFeatured: true,
        valuePoints: ["Streamlined clinical documentation", "Predictive medical data entry", "HIPAA-compliant security framework"],
        metrics: ["Reduced entry time by 60%", "Zero data breaches", "Automated compliance checks"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        systemArchitecture: [
            { name: "Frontend", value: "React.js (SPA)" },
            { name: "Backend", value: "Node.js (Express)" },
            { name: "Database", value: "MongoDB" },
            { name: "Security", value: "AES-256 Encryption" },
            { name: "Hosting", value: "Vercel" }
        ],
        engineeringDecisions: [
            { 
                title: "Why MongoDB instead of SQL?", 
                reason: "Flexible schema design for unpredictable medical forms.", 
                benefits: "Clinical forms vary drastically between specialties. A NoSQL document structure allows dynamic form generation without constant schema migrations." 
            }
        ],
        codeSnippet: {
            language: "javascript",
            description: "HIPAA-compliant data encryption middleware before DB insertion.",
            code: `// Audit logging & encryption interceptor\nconst patientSchema = new Schema({ ... });\n\npatientSchema.pre('save', async function(next) {\n  if (this.isModified('phi_data')) {\n    // Audit trail\n    await AuditLog.create({\n      action: 'PHI_UPDATE',\n      target_id: this._id,\n      timestamp: new Date()\n    });\n    \n    // Field-level encryption\n    this.phi_data = cryptoService.encrypt(this.phi_data);\n  }\n  next();\n});`
        },
        realStats: {
            components: "45+",
            apiRoutes: "32",
            models: "18",
            platform: "Vercel",
            buildTime: "12 Weeks"
        }
    },
    {
        id: "mock-edunova",
        title: "EduNova",
        category: "EdTech",
        isVisible: true,
        summary: "AI-powered learning platform for modern students and institutions.",
        description: "A comprehensive School Management System with 2FA, RBAC, and real-time institutional orchestration.",
        status: "Production",
        role: "Full Stack Architect",
        tags: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Tailwind"],
        image: "/projects/edunova.png",
        demo: "https://edunova-saas.vercel.app",
        github: "https://github.com/kumail-kmr25/Edunova-saas.git",
        isFeatured: false,
        valuePoints: ["Reduces administrative overhead by 40%", "Real-time student lifecycle management", "Secure institution-wide orchestration"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
        systemArchitecture: [
            { name: "Frontend", value: "Next.js" },
            { name: "Backend", value: "Next API Routes (Serverless)" },
            { name: "Database", value: "PostgreSQL" },
            { name: "ORM", value: "Prisma" },
            { name: "Hosting", value: "Vercel" }
        ],
        engineeringDecisions: [
            { 
                title: "Why PostgreSQL / Prisma?", 
                reason: "Strict relational data integrity.", 
                benefits: "Educational environments require complex relations (Students -> Classes -> Teachers -> Grades). Relational structure ensures data consistency, and Prisma gives type-safe DB queries." 
            }
        ],
        codeSnippet: {
            language: "typescript",
            description: "Complex hierarchical data fetching with Prisma.",
            code: `export async function getInstitutionalOverview(schoolId: string) {\n  return await prisma.school.findUnique({\n    where: { id: schoolId },\n    include: {\n      departments: {\n        include: {\n          courses: {\n            where: { isActive: true },\n            select: { id: true, name: true, credits: true }\n          },\n          staff: true\n        }\n      },\n      _count: {\n        select: { students: true, staff: true }\n      }\n    }\n  });\n}`
        },
        realStats: {
            components: "85+",
            apiRoutes: "40",
            models: "22",
            platform: "Vercel + Supabase DB",
            buildTime: "16 Weeks"
        }
    },
    {
        id: "mock-valekash",
        title: "ValeKash",
        category: "FinTech",
        isVisible: true,
        summary: "High-velocity fintech solution for seamless digital asset transactions and escrow.",
        description: "A secure payment processing and digital wallet platform focusing on transaction atomicity and high financial security standards.",
        status: "Concept",
        role: "System Architect",
        tags: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
        image: "/projects/valekash.png",
        demo: "https://valekash.vercel.app/",
        github: "https://github.com/kumail-kmr25/ValeKash-Final.git",
        isFeatured: false,
        valuePoints: ["Atomic digital asset transactions", "Automated escrow verification", "High-integrity financial ledger"],
        metrics: ["0% Double Spend", "1ms Ledger Latency", "99.9% Security Audit"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
        systemArchitecture: [
            { name: "Frontend", value: "Next.js 15 UI" },
            { name: "Ledger", value: "PostgreSQL (ACID)" },
            { name: "API", value: "Fastify / Node" }
        ],
        engineeringDecisions: [
            {
                title: "Why PostgreSQL for Ledger?",
                reason: "ACID compliance is mandatory.",
                benefits: "Guarantees that financial transactions are never partially completed, preventing double-spending."
            }
        ]
    },
    {
        id: "mock-nestq-ai",
        title: "NESTQ AI",
        category: "FinTech",
        isVisible: true,
        summary: "AI-driven financial analytics engine for predictive budgeting and treasury management.",
        description: "An intelligent platform that uses machine learning to categorize expenses and predict future cash flow trends. Formerly known as FinFlow AI.",
        status: "Production",
        role: "Lead Developer",
        tags: ["React.js", "MongoDB", "Node.js", "Tailwind"],
        image: "/projects/finflow.png",
        demo: "#",
        github: "#",
        isFeatured: false,
        valuePoints: ["95% accurate cash-flow predictions", "Intelligent expense categorization", "SME financial optimization"],
        metrics: ["95% Prediction Accuracy", "60% Render Speedup", "30% Lower API Costs"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
        systemArchitecture: [
            { name: "Frontend", value: "React / Shadcn" },
            { name: "AI Engine", value: "Python / TensorFlow" },
            { name: "Storage", value: "MongoDB Atlas" }
        ]
    },
    {
        id: "mock-clinkart",
        title: "Clinkart",
        category: "E-Commerce",
        isVisible: true,
        summary: "High-performance E-commerce engine for modern retail and rapid scaling.",
        description: "A headless e-commerce solution with extreme focus on SEO, core web vitals, and conversion optimization. Built for high-traffic retail flows.",
        status: "Production",
        role: "Full Stack Developer",
        tags: ["Next.js", "React.js", "MongoDB", "Tailwind"],
        image: "/projects/clinkart.png",
        demo: "#",
        github: "#",
        isFeatured: false,
        valuePoints: ["100/100 Lighthouse performance", "Hyper-optimized conversion funnel", "Scalable headless commerce"],
        metrics: ["100/100 Lighthouse", "15% Conversion Boost", "70% Payload Reduction"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
        systemArchitecture: [
            { name: "Store", value: "Next.js Static" },
            { name: "Orders", value: "GraphQL / Node" },
            { name: "DB", value: "MongoDB" }
        ]
    },
    {
        id: "mock-quebook",
        title: "Quebook",
        category: "Developer Tools",
        isVisible: true,
        summary: "Collaborative technical documentation platform for engineering-heavy teams.",
        description: "A documentation engine that supports markdown, live code samples, and complex system diagrams. Integrated with GitHub workflows.",
        status: "Beta",
        role: "Frontend Engineer",
        tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind"],
        image: "/projects/quebook.png",
        demo: "#",
        github: "#",
        isFeatured: false,
        valuePoints: ["Real-time document sync", "Interactive system diagrams", "Markdown-first technical writing"],
        metrics: ["0ms Navigation Delay", "100% SEO Score", "50+ Microservices Configured"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35).toISOString(),
        systemArchitecture: [
            { name: "Engine", value: "Next.js Static" },
            { name: "Storage", value: "MongoDB Atlas" }
        ]
    },
    {
        id: "mock-bab-e-ilm",
        title: "BAB E ILM",
        category: "Education",
        isVisible: true,
        summary: "Digital knowledge repository and comprehensive educational portal.",
        description: "A centralized platform for accessing structured educational content, featuring advanced search and categorizations. Built for scalability and accessibility in educational environments.",
        status: "Production",
        role: "Full Stack Developer",
        tags: ["React.js", "Node.js", "PostgreSQL", "Tailwind"],
        image: "/projects/babeilm.png",
        demo: "#",
        github: "#",
        isFeatured: false,
        valuePoints: ["Structured knowledge architecture", "Advanced semantic search", "Intuitive learning interfaces"],
        metrics: ["98% Search Accuracy", "30% Faster Research Time", "100+ Categories Mapped"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
        systemArchitecture: [
            { name: "Portal", value: "React / Vite" },
            { name: "Archive", value: "PostgreSQL" }
        ]
    }
];
