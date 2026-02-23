/**/
import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';

export const GET = async (req: Request, res: Response) => {
    try {
        const caseStudies = await prisma.caseStudy.findMany({
            where: { isPublished: true },
            orderBy: { created_at: "desc" },
        });
        return res.json(caseStudies);
    } catch (error) {
        console.error("Error fetching case studies:", error);
        return res.status(500).json({ error: "Failed to fetch" });
    }
}
