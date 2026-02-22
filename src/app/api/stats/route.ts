import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const [
            projectCount,
            caseStudyCount,
            completedFeaturesCount,
            siteStats
        ] = await Promise.all([
            prisma.project.count(),
            prisma.caseStudy.count({ where: { isPublished: true } }),
            prisma.featureRequest.count({ where: { status: "completed" } }),
            prisma.siteStats.findFirst(),
        ]);

        const stats = {
            totalProjects: projectCount + (siteStats?.totalProjects || 0),
            bugsFixed: siteStats?.bugsFixed || 0,
            caseStudiesWritten: caseStudyCount,
            featureRequestsCompleted: completedFeaturesCount,
            yearsLearning: siteStats?.yearsLearning || 1, // Default to 1 if not set
            deploymentCount: siteStats?.deploymentCount || 0,
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
