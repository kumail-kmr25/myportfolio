import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const config = await prisma.journeyConfig.findFirst();
        const phases = await prisma.journeyPhase.findMany({
            where: { visible: true },
            include: { steps: { where: { visible: true }, orderBy: { order: 'asc' } } },
            orderBy: { order: 'asc' }
        });
        const milestones = await prisma.journeyMilestone.findMany({
            where: { visible: true },
            orderBy: { date: 'desc' }
        });
        const goals = await prisma.journeyFutureGoal.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' }
        });

        return apiResponse({ 
            config: config || { enabled: false },
            phases,
            milestones,
            goals
        });
    } catch (error) {
        console.error("GET_JOURNEY_ERROR:", error);
        return apiError("Failed to fetch journey data");
    }
}
