import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const FALLBACK_STATS = {
    bugsFixed: 142,
    caseStudiesWritten: 2,
    featureRequestsCompleted: 0,
    yearsLearning: 2,
    deploymentCount: 102,
    projectsTotal: 3,
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
            patternsMatched,
            auditCount,
            auditLeads,
            referralsCount,
            leadMagnetsCount,
            playgroundSessions
        ] = await Promise.all([
            prisma.project.count({ where: { isVisible: true } }),
            prisma.featureRequest.count({ where: { status: "completed" } }),
            prisma.siteStats.findFirst(),
            prisma.diagnosticLog.count(),
            prisma.hireRequest.count({ where: { source: "diag_bridge" } }),
            prisma.hireRequest.count(),
            prisma.diagnosticLog.count({ where: { matchedPatternId: { not: null } } }),
            prisma.auditRequest.count(),
            prisma.auditRequest.count({ where: { contacted: true } }),
            (prisma as any).referral.count(),
            (prisma as any).leadMagnetDownload.count(),
            (prisma as any).playgroundSession.count()
        ]);

        const stats = {
            bugsFixed: siteStats?.bugsFixed || 0,
            caseStudiesWritten: caseStudyCount,
            featureRequestsCompleted: completedFeaturesCount,
            yearsLearning: siteStats?.yearsLearning || 0,
            deploymentCount: siteStats?.deploymentCount || 0,
            projectsTotal: (caseStudyCount || 0) + 6,
            diagRuns,
            leadGenTotal,
            hireRequests,
            patternsMatched,
            auditCount: (siteStats?.auditCount && siteStats.auditCount > 0) ? siteStats.auditCount : auditCount,
            auditLeads: (siteStats?.auditLeads && siteStats.auditLeads > 0) ? siteStats.auditLeads : auditLeads,
            referrals: referralsCount,
            leadMagnets: leadMagnetsCount,
            playgroundSessions: playgroundSessions
        };

        return apiResponse({ ...stats, deployment_version: "v1.0.2-stable" });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return apiResponse({ 
            ...FALLBACK_STATS, 
            deployment_version: "v1.0.2-fallback",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
