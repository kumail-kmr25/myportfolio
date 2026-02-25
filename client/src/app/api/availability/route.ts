import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch config and active projects in parallel
        const [config, activeProjects] = await Promise.all([
            prisma.systemConfig.findFirst(),
            prisma.activeProject.findMany({
                where: { status: "active" },
                orderBy: { expectedEndDate: "asc" }
            })
        ]);

        const maxProjects = config?.maxActiveProjects || 2;
        const activeCount = activeProjects.length;

        // 1. Manual Override Precedence
        if (config?.manualOverride) {
            return NextResponse.json({
                status: config.manualOverride,
                message: config.overrideMessage || (
                    config.manualOverride === "available" ? "Available for new projects" :
                        config.manualOverride === "limited" ? "Limited availability" : "Fully booked"),
                activeCount,
                maxProjects,
                nextSlot: config.manualOverride === "booked" && activeProjects[0] ? activeProjects[0].expectedEndDate : null
            });
        }

        // 2. Dynamic Logic
        if (activeCount === 0) {
            return NextResponse.json({
                status: "available",
                message: "Available for new projects",
                activeCount: 0,
                maxProjects,
                nextSlot: null
            });
        }

        if (activeCount < maxProjects) {
            return NextResponse.json({
                status: "limited",
                message: `Limited availability (${maxProjects - activeCount} slot left)`,
                activeCount,
                maxProjects,
                nextSlot: null
            });
        }

        // Fully booked
        return NextResponse.json({
            status: "booked",
            message: "Fully booked",
            activeCount,
            maxProjects,
            nextSlot: activeProjects[0]?.expectedEndDate || null
        });

    } catch (error) {
        console.error("AVAILABILITY_API_ERROR:", error);
        return NextResponse.json({
            status: "available",
            message: "Available for new projects",
            activeCount: 0,
            maxProjects: 2
        });
    }
}
