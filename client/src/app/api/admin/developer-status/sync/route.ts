import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !(session.user as any)?.userId) return apiError("Unauthorized", 401);

        const [config, activeProjects] = await Promise.all([
            prisma.systemConfig.findFirst(),
            prisma.activeProject.findMany({
                where: { status: "active" },
                orderBy: { expectedEndDate: "asc" }
            })
        ]);

        const maxProjects = config?.maxActiveProjects || 2;
        const activeCount = activeProjects.length;

        const suggestedCapacity = Math.min(Math.round((activeCount / maxProjects) * 100), 100);

        let suggestedStatus = "available";
        if (activeCount >= maxProjects) {
            suggestedStatus = "active_project";
        } else if (activeCount > 0) {
            suggestedStatus = "deep_work";
        }

        let nextAvailabilityDays = 0;
        if (activeCount >= maxProjects && activeProjects[0]) {
            const endDate = new Date(activeProjects[0].expectedEndDate);
            const now = new Date();
            const diffTime = endDate.getTime() - now.getTime();
            nextAvailabilityDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        }

        const currentFocus = activeProjects.length > 0
            ? `Developing: ${activeProjects.map(p => p.projectTitle).join(", ")}`
            : "Open to strategic collaborations & new projects";

        return apiResponse({
            status: suggestedStatus,
            capacityPercent: suggestedCapacity,
            nextAvailabilityDays,
            currentFocus,
            projectCount: activeCount,
            maxProjects
        });
    } catch (error) {
        console.error("SYNC_API_ERROR:", error);
        return apiError("System metrics triangulation failed");
    }
}
