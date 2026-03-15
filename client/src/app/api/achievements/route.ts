import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const FALLBACK_BADGES = [
    { id: "b-1", title: "Scale Master", description: "Successfully scaled systems to 1M+ users.", icon: "TrendingUp" },
    { id: "b-2", title: "Security Sentinel", description: "Led 50+ enterprise security audits.", icon: "Shield" },
    { id: "b-3", title: "Velocity Champion", description: "Consistent 2-week delivery cycles.", icon: "Zap" },
    { id: "b-4", title: "Lighthouse King", description: "Maintained 100/100 performance scores.", icon: "Award" }
];

export async function GET() {
    try {
        // AchievementBadges might be a virtual concept or stored in skill achievements
        const entries = await prisma.leaderboardEntry.findFirst({
            where: { displayName: "Kumail KMR" }
        });

        if (!entries || !entries.achievements || entries.achievements.length === 0) {
            return apiResponse({ badges: FALLBACK_BADGES });
        }

        // Map if needed, for now using fallback as schema is different
        return apiResponse({ badges: FALLBACK_BADGES });
    } catch (error) {
        console.error("GET_ACHIEVEMENTS_ERROR:", error);
        return apiResponse({ badges: FALLBACK_BADGES });
    }
}
