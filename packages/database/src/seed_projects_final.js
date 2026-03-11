require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const projects = [
    {
        title: "EDUNOVA - SCHOOL MANAGEMENT SYSTEM",
        summary: "Comprehensive academic governance and student lifecycle management platform.",
        description: "A high-performance system designed to streamline school operations, from admissions and attendance to grading and parent communication. Features a robust real-time dashboard for administrators.",
        status: "Production",
        role: "Full Stack Lead",
        tags: ["Next.js", "PostgreSQL", "Prisma", "Real-time Analytics"],
        image: "/projects/edunova.png",
        demo: "https://edunova-demo.vercel.app",
        github: "https://github.com/kumail-kmr25/edunova",
        category: "EdTech",
        isFeatured: true,
        problem: "Schools struggled with fragmented data, manual attendance tracking, and delayed communication between teachers and parents, leading to administrative inefficiency.",
        solution: "Implemented a centralized database with real-time sync, automated attendance via QR codes, and an integrated portal for instant parent-teacher interaction.",
        valuePoints: ["40% reduction in manual paperwork", "Real-time student progress tracking", "Secure cloud-based data storage"]
    },
    {
        title: "MedQ AI - HEALTHCARE MANAGEMENT SYSTEM",
        summary: "AI-driven clinical workflow optimization and patient care platform.",
        description: "An advanced healthcare system integrating AI for diagnostic assistance, automated scheduling, and secure electronic health records (EHR). Designed for modern clinics and hospitals.",
        status: "Beta",
        role: "AI Systems Architect",
        tags: ["AI/ML", "Next.js", "Node.js", "Docker"],
        image: "/projects/medq_ai.png",
        demo: "https://medq-ai.vercel.app",
        github: "https://github.com/kumail-kmr25/medq-ai",
        category: "HealthTech",
        isFeatured: true,
        problem: "Healthcare providers were overwhelmed by administrative tasks and lacked intelligent tools to assist in rapid patient diagnosis and scheduling optimization.",
        solution: "Integrated machine learning models for predictive diagnostics and a smart scheduling algorithm that reduced patient wait times by 25%.",
        valuePoints: ["AI diagnostic assistance", "Automated patient scheduling", "HIPAA-compliant data handling"]
    },
    {
        title: "CUE AI - PERSONAL ASSISTANT CHATBOT",
        summary: "Next-generation AI assistant for workflow automation and query resolution.",
        description: "A sophisticated AI chatbot that acts as a personal assistant, solving complex queries, automating repetitive tasks, and integrating with productivity tools to accelerate workflow.",
        status: "Production",
        role: "Lead Developer",
        tags: ["LLM", "OpenAI API", "Vector DB", "React"],
        image: "/projects/cue_ai.png",
        demo: "https://cue-ai.vercel.app",
        github: "https://github.com/kumail-kmr25/cue-ai",
        category: "AI & Productivity",
        isFeatured: true,
        problem: "Professionals lose significant time searching for information across various tools and performing redundant manual tasks.",
        solution: "Developed a context-aware chatbot using RAG (Retrieval-Augmented Generation) to provide instant, accurate answers and automate cross-platform tasks.",
        valuePoints: ["Instant query resolution", "Task automation workflows", "Context-aware conversations"]
    },
    {
        title: "VALEKASH - COMPREHENSIVE KASHMIR SYSTEM",
        summary: "Regional digital infrastructure for services, tourism, and community management.",
        description: "A dedicated platform for the Kashmir region, integrating local government services, tourism resources, and business directories into a single, user-friendly digital ecosystem.",
        status: "Production",
        role: "Full Stack Developer",
        tags: ["Next.js", "Mapbox", "Local SEO", "Serverless"],
        image: "/projects/valekash.png",
        demo: "https://valekash.com",
        github: "https://github.com/kumail-kmr25/valekash",
        category: "GovTech / Regional",
        isFeatured: false,
        problem: "Lack of a unified digital platform for local services and tourism in Kashmir led to information silos and poor accessibility for both residents and visitors.",
        solution: "Created a centralized hub with interactive maps, service directories, and cultural resources, significantly boosting regional digital engagement.",
        valuePoints: ["Unified regional service hub", "Interactive tourism mapping", "Local business ecosystem support"]
    },
    {
        title: "CLINKART - AI-POWERED E-COMMERCE",
        summary: "High-fashion marketplace with intelligent recommendation engines.",
        description: "A unique e-commerce platform that leverages AI algorithms to suggest products based on user behavior and style preferences. Features a premium, cinematic shopping interface.",
        status: "Beta",
        role: "E-commerce Specialist",
        tags: ["Recommendation Engine", "Tailwind CSS", "Stripe", "Next.js"],
        image: "/projects/clinkart.png",
        demo: "https://clinkart.shop",
        github: "https://github.com/kumail-kmr25/clinkart",
        category: "E-commerce",
        isFeatured: false,
        problem: "Standard e-commerce platforms often fail to provide personalized shopping experiences, leading to lower conversion rates in niche markets.",
        solution: "Implemented a behavior-based recommendation engine and a premium UI to enhance user engagement and drive personalized sales.",
        valuePoints: ["AI-driven product discovery", "Premium cinematic UI/UX", "Seamless secure payments"]
    },
    {
        title: "QUANT AI - FINANCE & MANAGEMENT SYSTEM",
        summary: "Enterprise-grade financial intelligence and accounting tool.",
        description: "A complete management solution for finance and accounting, providing deep insights, automated reporting, and AI-driven fiscal projections for businesses.",
        status: "Beta",
        role: "Fintech Engineer",
        tags: ["Data Visualization", "Fintech", "GraphQL", "Python"],
        image: "/projects/quant_ai.png",
        demo: "https://quant-ai.finance",
        github: "https://github.com/kumail-kmr25/quant-ai",
        category: "Fintech",
        isFeatured: false,
        problem: "Traditional accounting software is often too rigid or complex, making it difficult for businesses to gain real-time fiscal insights and accurate projections.",
        solution: "Built a flexible, AI-powered dashboard that automates complex financial reports and provides predictive modeling for better decision-making.",
        valuePoints: ["Automated fiscal reporting", "Predictive financial modeling", "Real-time budget tracking"]
    },
    {
        title: "QUEBOOK - AI SOCIAL MEDIA PLATFORM",
        summary: "Next-gen community platform with smart content categorization.",
        description: "An AI-powered social media network designed for meaningful interactions, featuring intelligent content filtering, community-driven features, and high user privacy.",
        status: "Concept",
        role: "Social Systems Architect",
        tags: ["WebSockets", "NoSQL", "AI Moderation", "Next.js"],
        image: "/projects/quebook.png",
        demo: "https://quebook.app",
        github: "https://github.com/kumail-kmr25/quebook",
        category: "Social Tech",
        isFeatured: false,
        problem: "Modern social platforms are often cluttered with irrelevant content and suffer from poor community moderation.",
        solution: "Designed an AI categorization engine that prioritizes relevant discussions and provides automated, fair content moderation.",
        valuePoints: ["Smart content categorization", "AI-driven community moderation", "Privacy-first architecture"]
    },
    {
        title: "MYTRIPZ - TRAVEL & BOOKING APP",
        summary: "Consolidated booking platform for travel, hotels, and dining.",
        description: "A comprehensive travel companion app that integrates flights, hotel stays, and restaurant reservations into a single, seamless booking experience.",
        status: "Production",
        role: "Product Engineer",
        tags: ["Mobile First", "Booking APIs", "Google Maps", "React Native"],
        image: "/projects/mytripz.png",
        demo: "https://mytripz.travel",
        github: "https://github.com/kumail-kmr25/mytripz",
        category: "TravelTech",
        isFeatured: false,
        problem: "Travelers struggle with managing multiple apps for different parts of their journey, leading to fragmented itineraries and stress.",
        solution: "Unified the entire travel lifecycle into one app, providing synchronized bookings and real-time updates for every stage of the trip.",
        valuePoints: ["Unified travel itinerary", "One-tap multi-service booking", "Real-time travel alerts"]
    }
];

async function main() {
    console.log('Upserting projects...');
    // Hide all existing projects first to ensure only the 8 requested ones are prominent
    await prisma.project.updateMany({
        data: { isVisible: false, isFeatured: false }
    });

    for (const project of projects) {
        console.log(`Upserting: ${project.title}`);
        await prisma.project.upsert({
            where: { title: project.title },
            update: { ...project, isVisible: true },
            create: { ...project, isVisible: true }
        });
    }
    console.log('Successfully updated 8 projects.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
