import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const [
            projectCount,
            caseStudyCount,
            completedFeaturesCount,
            siteStats,
            diagRuns,
            leadGenTotal,
            hireRequests,
            patternsMatched
        ] = await Promise.all([
            prisma.project.count(),
            prisma.caseStudy.count({ where: { isPublished: true } }),
            prisma.featureRequest.count({ where: { status: "completed" } }),
            prisma.siteStats.findFirst(),
            prisma.diagnosticLog.count(),
            prisma.hireRequest.count({ where: { source: "diag_bridge" } }),
            prisma.hireRequest.count(),
            prisma.diagnosticLog.count({ where: { matchedPatternId: { not: null } } })
        ]);

        const stats = {
            totalProjects: projectCount + (siteStats?.totalProjects || 0),
            bugsFixed: siteStats?.bugsFixed || 0,
            caseStudiesWritten: caseStudyCount,
            featureRequestsCompleted: completedFeaturesCount,
            yearsLearning: Math.max(siteStats?.yearsLearning || 0, 3),
            deploymentCount: siteStats?.deploymentCount || 0,
            diagRuns,
            leadGenTotal,
            hireRequests,
            patternsMatched
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
