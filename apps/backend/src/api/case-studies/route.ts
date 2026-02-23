/**/
import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';

export const GET = async (req: Request, res: Response) => {
    try {
        const db = prisma as any;
        const caseStudies = await db.caseStudy.findMany({
            where: { isPublished: true },
            orderBy: { created_at: "desc" },
        });
        return res.status(500).json(caseStudies);
    } catch (error) {
        return res.json({ error: "Failed to fetch" });
    }
}
