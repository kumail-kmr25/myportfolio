/**/
import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";
import { caseStudySchema } from "@portfolio/shared";

export const GET = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ error: "Unauthorized" });
        const db = prisma as any;
        const caseStudies = await db.caseStudy.findMany({ orderBy: { created_at: "desc" } });
        return res.status(500).json(caseStudies);
    } catch (error) {
        return res.json({ error: "Failed to fetch" });
    }
}

export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ error: "Unauthorized" });
        const body = req.body;
        const validatedData = caseStudySchema.parse(body);
        const db = prisma as any;
        const caseStudy = await db.caseStudy.create({ data: validatedData });
        return res.status(201).json(caseStudy);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create" });
    }
}