import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const config = await prisma.fitScoreConfig.findFirst({
            where: { enabled: true }
        });
        
        return apiResponse({ config, version: "v1.0.0" });
    } catch (error) {
        console.error("GET_FIT_SCORE_CONFIG_ERROR:", error);
        return apiError("Failed to fetch fit score config");
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = await prisma.fitScoreResponse.create({
            data: {
                ...body,
                answers: body.answers || {},
                score: body.score || 0,
                category: body.category || 'poor',
            }
        });
        return apiResponse(response);
    } catch (error) {
        console.error("POST_FIT_SCORE_RESPONSE_ERROR:", error);
        return apiError("Fit score submission failed");
    }
}
