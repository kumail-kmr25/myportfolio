import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchActivities } from "@/lib/admin-helpers";
import { apiResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return apiResponse([]); // Return empty array even on 401 for safety
        }

        const activities = await fetchActivities();
        return apiResponse(Array.isArray(activities) ? activities : []);
    } catch (error) {
        console.error("LIVE_FEED_API_ERROR:", error);
        return apiResponse([]); // Always 200 with [] on failure
    }
}
