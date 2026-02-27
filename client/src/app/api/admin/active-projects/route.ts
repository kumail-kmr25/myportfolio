import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const projects = await prisma.activeProject.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { clientName, projectTitle, status, startDate, expectedEndDate } = body;

        if (!clientName || !projectTitle || !status || !startDate || !expectedEndDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const project = await prisma.activeProject.create({
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
