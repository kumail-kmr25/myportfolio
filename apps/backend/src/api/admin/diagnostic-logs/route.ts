import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

export const GET = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const db = prisma as any;
        const logs = await db.diagnosticLog.findMany({
            orderBy: { createdAt: "desc" }
        });
        return res.status(500).json(logs);
    } catch (error) {
        return res.json({ error: "Failed to fetch logs" });
    }
}
