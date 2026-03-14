import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const voiceIntro = await prisma.voiceIntro.findFirst();
        return apiResponse(voiceIntro);
    } catch (error) {
        return apiError("Could not retrieve voice introduction", 500);
    }
}
