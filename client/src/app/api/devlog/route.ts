import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const logs = await prisma.devLog.findMany({
            where: { published: true },
            orderBy: { weekStartDate: 'desc' }
        });
        
        return apiResponse({ logs, version: "v1.0.0" });
    } catch (error) {
        console.error("GET_DEVLOGS_ERROR:", error);
        return apiError("Failed to fetch dev logs");
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await req.json();
        const log = await prisma.devLog.create({
            data: {
                ...body,
                weekStartDate: new Date(body.weekStartDate),
                completed: body.completed || [],
                inProgress: body.inProgress || [],
                learning: body.learning || [],
            }
        });
        return apiResponse(log);
    } catch (error) {
        console.error("POST_DEVLOG_ERROR:", error);
        return apiError("Dev log creation failed");
    }
}
