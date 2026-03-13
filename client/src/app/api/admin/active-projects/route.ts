import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized access attempt", 401);

        const projects = await prisma.activeProject.findMany({
            orderBy: { createdAt: "desc" }
        });
        return apiResponse(projects);
    } catch (error) {
        console.error("ACTIVE_PROJECTS_GET_ERROR:", error);
        return apiError("Critical failure in project retrieval");
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await request.json();
        const { clientName, projectTitle, status, startDate, expectedEndDate } = body;

        if (!clientName || !projectTitle || !status || !startDate || !expectedEndDate) {
            return apiError("Missing required deployment parameters", 400);
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
        return apiResponse(project, 201);
    } catch (error) {
        console.error("ACTIVE_PROJECTS_POST_ERROR:", error);
        return apiError("Failed to register active project");
    }
}
