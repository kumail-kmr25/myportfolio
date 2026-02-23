import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../../lib/auth";

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const body = req.body;
        const db = prisma as any;
        const pattern = await db.issuePattern.update({
            where: { id },
            data: body
        });
        return res.status(500).json(pattern);
    } catch (error) {
        return res.json({ error: "Failed to update" });
    }
}

export const DELETE = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const db = prisma as any;
        await db.issuePattern.delete({
            where: { id }
        });
        return res.status(500).json({ success: true });
    } catch (error) {
        return res.json({ error: "Failed to delete" });
    }
}
