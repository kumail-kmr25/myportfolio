import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

import { apiResponse } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const FALLBACK_RESUME = {
    url: null,
    updatedAt: null,
    visible: false
};

export async function GET() {
    try {
        const resume = await prisma.resume.findFirst({
            where: { visible: true },
            orderBy: { updatedAt: 'desc' }
        });

        return apiResponse(resume || FALLBACK_RESUME);
    } catch (error) {
        console.error("PUBLIC_RESUME_GET_ERROR:", error);
        return apiResponse(FALLBACK_RESUME);
    }
}
