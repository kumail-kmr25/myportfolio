import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const revenueData = await prisma.clientRevenue.findMany({
            where: { isLive: true },
            orderBy: { lastUpdated: "desc" }
        });
        return apiResponse(revenueData);
    } catch (error) {
        return apiError("Could not retrieve revenue metrics", 500);
    }
}
