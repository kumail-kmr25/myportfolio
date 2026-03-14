import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const templates = await prisma.proposalTemplate.findMany({
            where: { active: true }
        });
        return apiResponse({ templates });
    } catch (error) {
        console.error("GET_PROPOSAL_TEMPLATES_ERROR:", error);
        return apiError("Failed to fetch proposal templates");
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await req.json();
        const proposal = await prisma.generatedProposal.create({
            data: {
                ...body,
                features: body.features || [],
            }
        });
        return apiResponse(proposal);
    } catch (error) {
        console.error("POST_PROPOSAL_ERROR:", error);
        return apiError("Proposal generation failed");
    }
}
