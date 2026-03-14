import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const achievements = await prisma.achievement.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' }
        });
        return apiResponse({ achievements });
    } catch (error) {
        console.error("GET_ACHIEVEMENTS_ERROR:", error);
        return apiError("Failed to fetch achievements");
    }
}
