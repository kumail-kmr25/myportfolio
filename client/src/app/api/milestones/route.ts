import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const milestones = await prisma.projectMilestone.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' }
        });
        return apiResponse({ milestones });
    } catch (error) {
        console.error("GET_MILESTONES_ERROR:", error);
        // Return empty array instead of 500 to prevent frontend crash
        return apiResponse({ milestones: [] });
    }
}

