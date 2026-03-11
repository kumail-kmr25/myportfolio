import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
        return NextResponse.json(projects);
    } catch (error) {
        console.error("GET_PROJECTS_ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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
