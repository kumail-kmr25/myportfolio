import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';

export const GET = async (req: Request, res: Response) => {
    try {
        const phases = await prisma.journeyPhase.findMany({
            orderBy: {
                order: "asc",
            },
        });
        return res.json(phases);
    } catch (error) {
        console.error("[API] Error fetching journey phases:", error);
        return res.status(500).json({ error: "Failed to fetch journey phases" });
    }
}
