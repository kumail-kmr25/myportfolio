import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../../lib/auth";

export const DELETE = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }

        await prisma.hireRequest.delete({
            where: { id },
        });

        return res.json({ success: true });
    } catch (error) {
        console.error("Admin hire DELETE error:", error);
        return res.status(500).json({ error: "Failed to delete hire request" });
    }
}
