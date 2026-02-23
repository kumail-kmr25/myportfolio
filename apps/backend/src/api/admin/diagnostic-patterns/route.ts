import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

export const GET = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const db = prisma as any;
        const patterns = await db.issuePattern.findMany({
            orderBy: { createdAt: "desc" }
        });
        return res.status(500).json(patterns);
    } catch (error) {
        return res.json({ error: "Failed to fetch" });
    }
}

export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const body = req.body;
        const db = prisma as any;
        const pattern = await db.issuePattern.create({
            data: body
        });
        return res.status(201).json(pattern);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create" });
    }
}
