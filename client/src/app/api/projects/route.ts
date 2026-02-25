import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";
import { projectSchema } from "@portfolio/shared";

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                created_at: "desc",
            },
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("[API] Error fetching projects:", error);
        return NextResponse.json({
            error: "Failed to fetch projects",
            details: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
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
