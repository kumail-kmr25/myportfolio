import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const videos = await prisma.projectVideo.findMany({
            where: { enabled: true },
            orderBy: { order: "asc" }
        });
        return apiResponse(videos);
    } catch (error) {
        return apiError("Could not retrieve video assets", 500);
    }
}
