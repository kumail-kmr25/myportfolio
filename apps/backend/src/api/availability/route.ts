import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';

export const dynamic = 'force-dynamic';

export const GET = async (req: Request, res: Response) => {
    try {
        const db = prisma as any;

        // Fetch config and active projects in parallel
        const [config, activeProjects] = await Promise.all([
            db.systemConfig.findFirst(),
            db.activeProject.findMany({
                where: { status: "active" },
                orderBy: { expectedEndDate: "asc" }
            })
        ]);

        const maxProjects = config?.maxActiveProjects || 2;
        const activeCount = activeProjects.length;

        // 1. Manual Override Precedence
        if (config?.manualOverride) {
            return res.json({
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
            return res.json({
                status: "available",
                message: "Available for new projects",
                activeCount: 0,
                maxProjects,
                nextSlot: null
            });
        }

        if (activeCount < maxProjects) {
            return res.json({
                status: "limited",
                message: `Limited availability (${maxProjects - activeCount} slot left)`,
                activeCount,
                maxProjects,
                nextSlot: null
            });
        }

        // Fully booked
        return res.json({
            status: "booked",
            message: "Fully booked",
            activeCount,
            maxProjects,
            nextSlot: activeProjects[0]?.expectedEndDate || null
        });

    } catch (error) {
        console.error("AVAILABILITY_API_ERROR:", error);
        return res.json({
            status: "available",
            message: "Available for new projects",
            activeCount: 0,
            maxProjects: 2
        });
    }
}
