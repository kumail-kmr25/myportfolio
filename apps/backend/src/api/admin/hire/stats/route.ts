import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../../lib/auth";

export const GET = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Aggregate stats
        const [
            totalCount,
            statusDistribution,
            serviceDistribution,
            recentSubmissions
        ] = await Promise.all([
            prisma.hireRequest.count(),
            prisma.hireRequest.groupBy({
                by: ['status'],
                _count: { _all: true }
            }),
            prisma.hireRequest.groupBy({
                by: ['selectedService'],
                _count: { _all: true }
            }),
            prisma.hireRequest.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    selectedService: true,
                    createdAt: true,
                    status: true
                }
            })
        ]);

        return res.json({
            totalCount,
            statusDistribution,
            serviceDistribution,
            recentSubmissions
        });
    } catch (error) {
        console.error("Admin hire stats error:", error);
        return res.status(500).json({ error: "Failed to fetch hire statistics" });
    }
}
