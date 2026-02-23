import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";
import { siteStatsSchema } from "@portfolio/shared";

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const body = req.body;
        const validatedData = siteStatsSchema.parse(body);

        const existingStats = await prisma.siteStats.findFirst();

        const stats = await prisma.siteStats.upsert({
            where: { id: existingStats?.id || "default" },
            update: {
                ...validatedData,
                lastUpdated: new Date(),
            },
            create: {
                ...validatedData,
                lastUpdated: new Date(),
            },
        });

        return res.status(200).json(stats);
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return res.status(400).json({ error: (error as any).format() });
        }
        console.error("Admin Stats PATCH error:", error);
        return res.status(500).json({ error: "Failed to update stats" });
    }
}
