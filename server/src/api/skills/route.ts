import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';

export const GET = async (req: Request, res: Response) => {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: {
                order: "asc",
            },
        });
        return res.json(skills);
    } catch (error) {
        console.error("[API] Error fetching skills:", error);
        return res.status(500).json({ error: "Failed to fetch skills" });
    }
}
