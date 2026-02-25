import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

        return NextResponse.json({
            totalCount,
            statusDistribution,
            serviceDistribution,
            recentSubmissions
        });
    } catch (error) {
        console.error("Admin hire stats error:", error);
        return NextResponse.json({ error: "Failed to fetch hire statistics" }, { status: 500 });
    }
}
