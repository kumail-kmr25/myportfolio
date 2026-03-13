import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        const resume = await prisma.resume.findFirst({
            orderBy: { updatedAt: 'desc' }
        });

        if (!resume) {
            return apiResponse({
                url: null,
                updatedAt: null,
                visible: false
            });
        }

        return apiResponse(resume);
    } catch (error) {
        console.error("RESUME_GET_ERROR:", error);
        return apiError("Resume retrieval failed");
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await request.json();
        const { url, visible } = body;

        const resume = await prisma.resume.upsert({
            where: { id: "current-resume" },
            update: { url, visible, updatedAt: new Date() },
            create: { id: "current-resume", url, visible, updatedAt: new Date() }
        });

        return apiResponse(resume);
    } catch (error) {
        console.error("RESUME_POST_ERROR:", error);
        return apiError("Resume persistence failure");
    }
}
