import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

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
            return apiResponse({
                status: config.manualOverride,
                message: config.overrideMessage || (
                    config.manualOverride === "available" ? "Available for new projects" :
                        config.manualOverride === "limited" ? "Limited availability" : "Fully booked"),
                activeCount,
                maxProjects,
                nextSlot: config.manualOverride === "booked" && activeProjects[0] ? activeProjects[0].expectedEndDate : null,
                deployment_version: "v1.0.1-stable",
                vercel_id: process.env.VERCEL_URL || "local"
            });
        }

        // 2. Dynamic Logic
        if (activeCount === 0) {
            return apiResponse({
                status: "available",
                message: "Available for new projects",
                activeCount: 0,
                maxProjects,
                nextSlot: null,
                deployment_version: "v1.0.1-stable",
                vercel_id: process.env.VERCEL_URL || "local"
            });
        }

        if (activeCount < maxProjects) {
            return apiResponse({
                status: "limited",
                message: `Limited availability (${maxProjects - activeCount} slot left)`,
                activeCount,
                maxProjects,
                nextSlot: null,
                deployment_version: "v1.0.1-stable",
                vercel_id: process.env.VERCEL_URL || "local"
            });
        }

        // Fully booked
        return apiResponse({
            status: "booked",
            message: "Fully booked",
            activeCount,
            maxProjects,
            nextSlot: activeProjects[0]?.expectedEndDate || null,
            deployment_version: "v1.0.1-stable",
            vercel_id: process.env.VERCEL_URL || "local"
        });

    } catch (error) {
        console.error("AVAILABILITY_API_ERROR:", error);
        return apiResponse({
            status: "available",
            message: "Available for new projects",
            activeCount: 0,
            maxProjects: 2,
            deployment_version: "v1.0.1-fallback",
            vercel_id: process.env.VERCEL_URL || "local"
        });
    }
}
