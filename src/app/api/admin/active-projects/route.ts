import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const db = prisma as any;
        const projects = await db.activeProject.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { clientName, projectTitle, status, startDate, expectedEndDate } = body;

        if (!clientName || !projectTitle || !status || !startDate || !expectedEndDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const db = prisma as any;
        const project = await db.activeProject.create({
            data: {
                clientName,
                projectTitle,
                status,
                startDate: new Date(startDate),
                expectedEndDate: new Date(expectedEndDate)
            }
        });
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
