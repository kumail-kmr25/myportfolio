import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized access attempt", 401);

        const logs = await (prisma as any).adminActivityLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 50,
            include: { admin: { select: { name: true, email: true } } }
        });

        return apiResponse(logs);
    } catch (error) {
        console.error("ACTIVITY_LOG_GET_ERROR:", error);
        return apiError("Audit log retrieval failed");
    }
}
