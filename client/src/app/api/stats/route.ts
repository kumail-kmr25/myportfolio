import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const FALLBACK_STATS = {
    bugsFixed: 142,
    caseStudiesWritten: 2,
    featureRequestsCompleted: 0,
    yearsLearning: 2,
    deploymentCount: 102,
    diagRuns: 0,
    leadGenTotal: 0,
    hireRequests: 0,
    patternsMatched: 0
};

export async function GET() {
    try {
        const [
            caseStudyCount,
            completedFeaturesCount,
            siteStats,
            diagRuns,
            leadGenTotal,
            hireRequests,
            patternsMatched
        ] = await Promise.all([
            prisma.project.count({ where: { isVisible: true } }),
            prisma.featureRequest.count({ where: { status: "completed" } }),
            prisma.siteStats.findFirst(),
            prisma.diagnosticLog.count(),
            prisma.hireRequest.count({ where: { source: "diag_bridge" } }),
            prisma.hireRequest.count(),
            prisma.diagnosticLog.count({ where: { matchedPatternId: { not: null } } })
        ]);

        const stats = {
            bugsFixed: siteStats?.bugsFixed || 0,
            caseStudiesWritten: caseStudyCount,
            featureRequestsCompleted: completedFeaturesCount,
            yearsLearning: siteStats?.yearsLearning || 0,
            deploymentCount: siteStats?.deploymentCount || 0,
            diagRuns,
            leadGenTotal,
            hireRequests,
            patternsMatched
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Error fetching stats:", error);
        // Return fallback data to keep UI functional
        return NextResponse.json(FALLBACK_STATS);
    }
}
