import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            where: { isVisible: true },
            orderBy: [
                { isFeatured: 'desc' },
                { createdAt: 'desc' }
            ]
        });
        
        if (projects.length === 0) {
            return apiResponse(MOCK_PROJECTS);
        }

        return apiResponse({ projects, version: "v1.0.2-stable" });
    } catch (error) {
        console.error("GET_PROJECTS_ERROR:", error);
        const fallback = [
            {
                id: "fallback-1",
                title: "Edunova",
                isVisible: true,
                summary: "Enterprise-grade SaaS for academic orchestration.",
                description: "A comprehensive School Management System with 2FA and RBAC.",
                status: "Production",
                role: "Full Stack Architect",
                tags: ["TypeScript", "Next.js", "PostgreSQL"],
                image: "/projects/edunova.png",
                demo: "https://edunova-saas.vercel.app",
                isFeatured: true,
                valuePoints: ["Reduces administrative overhead by 40%", "Real-time student lifecycle management"],
                createdAt: new Date().toISOString()
            },
            {
                id: "fallback-2",
                title: "MedQ AI",
                isVisible: true,
                summary: "Next-gen healthcare data management with clinical workflows.",
                description: "A secure medical record system (EMR) focusing on data privacy.",
                status: "Beta",
                role: "Backend Lead",
                tags: ["React.js", "MongoDB", "Node.js"],
                image: "/projects/medq_ai.png",
                demo: "https://gemini-med.vercel.app/",
                isFeatured: true,
                valuePoints: ["Streamlined clinical documentation", "HIPAA-compliant framework"],
                createdAt: new Date().toISOString()
            }
        ];
        return apiResponse({ projects: fallback, version: "v1.0.2-fallback" });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

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
        return apiResponse(project);
    } catch (error) {
        console.error("POST_PROJECT_ERROR:", error);
        return apiError("Project creation failed");
    }
}
