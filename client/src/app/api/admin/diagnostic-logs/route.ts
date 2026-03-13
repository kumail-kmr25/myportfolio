import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const logs = await prisma.diagnosticLog.findMany({
            orderBy: { createdAt: "desc" }
        });
        return apiResponse(logs);
    } catch (error) {
        console.error("DiagnosticLogs GET error:", error);
        return apiError("Failed to fetch logs");
    }
}
