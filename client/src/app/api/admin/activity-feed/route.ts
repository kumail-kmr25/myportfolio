import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchActivities } from "@/lib/admin-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json([], { status: 200 }); // Return empty array even on 401 for safety
        }

        const activities = await fetchActivities();
        return NextResponse.json(Array.isArray(activities) ? activities : []);
    } catch (error) {
        console.error("LIVE_FEED_API_ERROR:", error);
        return NextResponse.json([], { status: 200 }); // Always 200 with [] on failure
    }
}
