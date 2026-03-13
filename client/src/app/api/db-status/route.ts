import { prisma } from "@portfolio/database";
import { apiResponse } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        await prisma.$connect();
        return apiResponse({ status: "connected", timestamp: new Date().toISOString() });
    } catch (error) {
        console.error("[DB-STATUS] Connection failed:", error);
        return apiResponse({ status: "failed", timestamp: new Date().toISOString() });
    }
}
