import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return apiError("Unauthorized", 401);
        }

        const [totalCount, statusDistribution, serviceDistribution, recentSubmissions] =
            await Promise.all([
                prisma.hireRequest.count(),
                prisma.hireRequest.groupBy({
                    by: ["status"],
                    _count: { _all: true }
                }),
                prisma.hireRequest.groupBy({
                    by: ["selectedService"],
                    _count: { _all: true }
                }),
                prisma.hireRequest.findMany({
                    take: 5,
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        name: true,
                        selectedService: true,
                        createdAt: true,
                        status: true
                    }
                })
            ]);

        return apiResponse({
            totalCount,
            statusDistribution,
            serviceDistribution,
            recentSubmissions
        });
    } catch (error) {
        console.error("Admin hire stats error:", error);
        return apiError("Failed to fetch hire statistics");
    }
}
