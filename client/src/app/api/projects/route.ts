import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MOCK_PROJECTS } from "@/lib/mock-data";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: { isVisible: true },
            orderBy: [
                { isFeatured: 'desc' },
                { created_at: 'desc' }
            ]
        });
        
        // Fallback to mock data if no projects found in DB
        if (projects.length === 0) {
            return NextResponse.json(MOCK_PROJECTS);
        }

        return NextResponse.json(projects);
    } catch (error) {
        console.error("GET_PROJECTS_ERROR:", error);
        // Guaranteed fallback if DB or imports fail
        return NextResponse.json([
            {
                id: "fallback-1",
                title: "Edunova",
                isVisible: true,
                summary: "Enterprise-grade SaaS for academic orchestration.",
                description: "A comprehensive School Management System.",
                status: "Production",
                role: "Full Stack Architect",
                tags: ["TypeScript", "Next.js", "PostgreSQL"],
                image: "/projects/edunova.png",
                demo: "https://edunova-saas.vercel.app",
                isFeatured: true,
                valuePoints: ["Reduces administrative overhead", "Real-time orchestration"],
                created_at: new Date().toISOString()
            }
        ]);
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const project = await prisma.project.create({
            data: {
                ...body,
                tags: body.tags || [],
                valuePoints: body.valuePoints || [],
                metrics: body.metrics || [],
                decisionLogs: body.decisionLogs || [],
                gallery: body.gallery || [],
                timeline: body.timeline || null,
                architecture: body.architecture || null,
            }
        });
        return NextResponse.json(project);
    } catch (error) {
        console.error("POST_PROJECT_ERROR:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
