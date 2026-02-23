import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

export const GET = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const db = prisma as any;
        let config = await db.systemConfig.findFirst();

        if (!config) {
            config = await db.systemConfig.create({
                data: { maxActiveProjects: 2 }
            });
        }

        return res.status(500).json(config);
    } catch (error) {
        return res.json({ error: "Failed to fetch" });
    }
}

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const body = req.body;
        const db = prisma as any;

        const existing = await db.systemConfig.findFirst();

        let config;
        if (existing) {
            config = await db.systemConfig.update({
                where: { id: existing.id },
                data: body
            });
        } else {
            config = await db.systemConfig.create({
                data: body
            });
        }

        return res.status(500).json(config);
    } catch (error) {
        return res.json({ error: "Failed to update" });
    }
}
