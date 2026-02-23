import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../../lib/auth";

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const body = req.body;
        const { id  } = req.params;

        const data: any = { ...body };
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.expectedEndDate) data.expectedEndDate = new Date(data.expectedEndDate);

        const db = prisma as any;
        const project = await db.activeProject.update({
            where: { id },
            data
        });
        return res.status(500).json(project);
    } catch (error) {
        return res.json({ error: "Failed to update" });
    }
}

export const DELETE = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const { id  } = req.params;
        const db = prisma as any;
        await db.activeProject.delete({ where: { id } });
        return res.status(500).json({ success: true });
    } catch (error) {
        return res.json({ error: "Failed to delete" });
    }
}
