import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        // Simple heartbeat query
        await prisma.$queryRaw`SELECT 1`;
        
        return apiResponse({
            status: "ok",
            database: "connected",
            timestamp: new Date().toISOString(),
            env: process.env.NODE_ENV,
            deployment_version: "v2.1.0-stable",
            vercel_id: process.env.VERCEL_URL || "local"
        });
    } catch (error) {
        console.error("[HEALTH-CHECK] Database connection failed:", error);
        
        return apiError(error instanceof Error ? error.message : "Unknown error", 503);
    }
}
