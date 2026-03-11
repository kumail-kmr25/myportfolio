import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { projectSchema } from "@portfolio/shared";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const FALLBACK_PROJECTS = [
    {
        id: "edunova",
        title: "Edunova",
        summary: "Enterprise-grade academic orchestration platform.",
        description: "A comprehensive School Management System with 2FA, RBAC, and real-time analytics.",
        status: "Production",
        image: "/projects/edunova.png",
        tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
        category: "Education",
        isFeatured: true,
        isVisible: true
    },
    {
        id: "medcipher",
        title: "MedCipher",
        summary: "Secure healthcare data management and AI diagnostics.",
        description: "HIPAA-compliant platform for medical record management with integrated AI assistance.",
        status: "Production",
        image: "/projects/medq_ai.png",
        tags: ["React", "Node.js", "MongoDB", "AI"],
        category: "Healthcare",
        isFeatured: true,
        isVisible: true
    },
    {
        id: "valekash",
        title: "ValeKash",
        summary: "FinTech solution for seamless cross-border payments.",
        description: "High-performance payment gateway with multi-currency support and fraud detection.",
        status: "Beta",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
        tags: ["FinTech", "Next.js", "PostgreSQL", "Stripe"],
        category: "FinTech",
        isFeatured: true,
        isVisible: true
    },
    {
        id: "finflow-ai",
        title: "FinFlow AI",
        summary: "AI-driven financial analytics and forecasting.",
        description: "Predictive financial modeling platform utilizing machine learning for market analysis.",
        status: "Beta",
        image: "/projects/finflow.png", // Corrected path
        tags: ["AI", "Python", "React", "Tf.js"],
        category: "FinTech",
        isFeatured: false,
        isVisible: true
    },
    {
        id: "clinkart",
        title: "Clinkart",
        summary: "Modern E-commerce platform for high-end retail.",
        description: "Feature-rich e-commerce engine with advanced search and inventory management.",
        status: "Production",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200",
        tags: ["E-commerce", "Next.js", "Tailwind", "Shopify"],
        category: "E-commerce",
        isFeatured: false,
        isVisible: true
    },
    {
        id: "quebook",
        title: "Quebook",
        summary: "Real-time queue management and booking system.",
        description: "Scalable booking platform handling thousands of concurrent users safely.",
        status: "Production",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200",
        tags: ["SaaS", "Real-time", "Redis", "Socket.io"],
        category: "SaaS",
        isFeatured: false,
        isVisible: true
    }
];


export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: {
                isVisible: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("[API] Error fetching projects:", error);
        return NextResponse.json(FALLBACK_PROJECTS);
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = projectSchema.parse(body);

        const project = await prisma.project.create({
            data: validatedData,
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return NextResponse.json({ error: (error as any).format() }, { status: 400 });
        }
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
