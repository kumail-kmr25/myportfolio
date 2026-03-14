import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const items = await prisma.techRadarItem.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' }
        });
        
        return apiResponse({ items, version: "v1.0.0" });
    } catch (error) {
        console.error("GET_TECH_RADAR_ERROR:", error);
        return apiError("Failed to fetch tech radar");
    }
}
