import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const patterns = await prisma.issuePattern.findMany({
            orderBy: { createdAt: "desc" }
        });
        return apiResponse(patterns);
    } catch (error) {
        console.error("IssuePatterns GET error:", error);
        return apiError("Failed to fetch patterns");
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await request.json();
        const pattern = await prisma.issuePattern.create({ data: body });
        return apiResponse(pattern, 201);
    } catch (error) {
        console.error("IssuePatterns POST error:", error);
        return apiError("Failed to create pattern");
    }
}
