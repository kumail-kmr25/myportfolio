import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../../lib/auth";

export const dynamic = 'force-dynamic';

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { replied } = req.body;
        const { id } = req.params;

        const updated = await prisma.contactSubmission.update({
            where: { id },
            data: { replied },
        });

        return res.json(updated);
    } catch (error) {
        console.error("Admin contact PATCH error:", error);
        return res.status(500).json({ error: "Failed to update message" });
    }
}

export const DELETE = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;

        // Verify message exists
        const existingMessage = await prisma.contactSubmission.findUnique({
            where: { id },
        });

        if (!existingMessage) {
            return res.status(404).json({ error: "Message not found" });
        }

        await prisma.contactSubmission.delete({
            where: { id },
        });

        return res.json({ success: true });
    } catch (error) {
        console.error("Admin contact DELETE error:", error);
        return res.status(500).json({ error: "Failed to delete message" });
    }
}
