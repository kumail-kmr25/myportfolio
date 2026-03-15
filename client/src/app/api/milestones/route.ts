import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DEFAULT_MILESTONES = [
    { id: "m-1", date: "Month 1", title: "Discovery & Deep Architectural Audit", description: "Comprehensive analysis of business requirements and technical feasibility.", icon: "Search" },
    { id: "m-2", date: "Month 2", title: "MVP Core Logic & Beta Infrastructure", description: "Deploying the primary engine and cloud orchestration.", icon: "Zap" },
    { id: "m-3", date: "Month 3", title: "Conversion Optimization & Scaling", description: "System hardening and global deployment for maximum impact.", icon: "TrendingUp" }
];

export async function GET() {
    try {
        const milestones = await prisma.projectMilestone.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' }
        });

        if (milestones.length === 0) {
            return apiResponse({ milestones: DEFAULT_MILESTONES });
        }

        return apiResponse({ milestones });
    } catch (error) {
        console.error("GET_MILESTONES_ERROR:", error);
        // Return defaults instead of empty array
        return apiResponse({ milestones: DEFAULT_MILESTONES });
    }
}


