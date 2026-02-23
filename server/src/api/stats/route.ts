import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';

export const GET = async (req: Request, res: Response) => {
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
            (prisma as any).diagnosticLog.count(),
            (prisma as any).hireRequest.count({ where: { source: "diag_bridge" } }),
            (prisma as any).hireRequest.count(),
            (prisma as any).diagnosticLog.count({ where: { matchedPatternId: { not: null } } })
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

        return res.json(stats);
    } catch (error) {
        console.error("Error fetching stats:", error);
        return res.status(500).json({ error: "Failed to fetch stats" });
    }
}
