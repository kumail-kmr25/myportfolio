import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const previews = await prisma.livePreview.findMany({
            where: { enabled: true },
            orderBy: { order: "asc" }
        });
        return apiResponse(previews);
    } catch (error) {
        return apiError("Could not retrieve site previews", 500);
    }
}
