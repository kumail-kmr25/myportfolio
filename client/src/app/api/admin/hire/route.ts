import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const hireRequests = await prisma.hireRequest.findMany({
            orderBy: { createdAt: "desc" },
        });

        return apiResponse(hireRequests);
    } catch (error) {
        console.error("Admin hire GET error:", error);
        return apiError("Failed to fetch lead generation data");
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const { id, status } = await request.json();

        if (!id || !status) {
            return apiError("Entity ID and status required", 400);
        }

        const updatedRequest = await prisma.hireRequest.update({
            where: { id },
            data: { status },
        });

        return apiResponse(updatedRequest);
    } catch (error) {
        console.error("Admin hire PATCH error:", error);
        return apiError("Failed to update lead status");
    }
}
