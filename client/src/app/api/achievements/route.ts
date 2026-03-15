import { apiResponse } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Curated achievement badges — update manually or via admin
const ACHIEVEMENT_BADGES = [
    { id: "b-1", title: "Scale Master", description: "Successfully scaled systems to 1M+ users.", icon: "TrendingUp" },
    { id: "b-2", title: "Security Sentinel", description: "Led 50+ enterprise security audits.", icon: "Shield" },
    { id: "b-3", title: "Velocity Champion", description: "Consistent 2-week delivery cycles.", icon: "Zap" },
    { id: "b-4", title: "Lighthouse King", description: "Maintained 100/100 performance scores.", icon: "Award" },
    { id: "b-5", title: "API Architect", description: "Designed 30+ production REST & GraphQL APIs.", icon: "Medal" },
    { id: "b-6", title: "Zero Downtime", description: "Executed 100+ deployments without outages.", icon: "Trophy" }
];

export async function GET() {
    return apiResponse({ badges: ACHIEVEMENT_BADGES });
}
