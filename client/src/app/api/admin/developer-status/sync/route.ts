import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !(session.user as any)?.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch current config and active projects
        const [config, activeProjects] = await Promise.all([
            prisma.systemConfig.findFirst(),
            prisma.activeProject.findMany({
                where: { status: "active" },
                orderBy: { expectedEndDate: "asc" }
            })
        ]);

        const maxProjects = config?.maxActiveProjects || 2;
        const activeCount = activeProjects.length;

        // Calculate suggested metrics
        // 1. Capacity Percent = (activeCount / maxProjects) * 100, capped at 100
        const suggestedCapacity = Math.min(Math.round((activeCount / maxProjects) * 100), 100);

        // 2. Suggested Status
        let suggestedStatus = "available";
        if (activeCount >= maxProjects) {
            suggestedStatus = "active_project";
        } else if (activeCount > 0) {
            suggestedStatus = "deep_work"; // Or keeping it as is, but deep_work is a good "limited" fit
        }

        // 3. Next Availability (days from now to the first project's end date)
        let nextAvailabilityDays = 0;
        if (activeCount >= maxProjects && activeProjects[0]) {
            const endDate = new Date(activeProjects[0].expectedEndDate);
            const now = new Date();
            const diffTime = endDate.getTime() - now.getTime();
            nextAvailabilityDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        }

        // 4. Current Focus (using titles of active projects)
        const currentFocus = activeProjects.length > 0
            ? `Developing: ${activeProjects.map(p => p.projectTitle).join(", ")}`
            : "Open to strategic collaborations & new projects";

        return NextResponse.json({
            status: suggestedStatus,
            capacityPercent: suggestedCapacity,
            nextAvailabilityDays,
            currentFocus,
            projectCount: activeCount,
            maxProjects
        });

    } catch (error) {
        console.error("SYNC_API_ERROR:", error);
        return NextResponse.json({ error: "Failed to sync metrics" }, { status: 500 });
    }
}
