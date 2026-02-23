import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

// Admin: Fetch all hire requests
export const GET = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const hireRequests = await prisma.hireRequest.findMany({
            orderBy: { createdAt: "desc" },
        });

        return res.json(hireRequests);
    } catch (error) {
        console.error("Admin hire GET error:", error);
        return res.status(500).json({ error: "Failed to fetch hire requests" });
    }
}

// Admin: Update hire request status
export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id, status } = req.body;

        if (!id || !status) {
            return res.status(400).json({ error: "ID and status are required" });
        }

        const updatedRequest = await prisma.hireRequest.update({
            where: { id },
            data: { status },
        });

        return res.json(updatedRequest);
    } catch (error) {
        console.error("Admin hire PATCH error:", error);
        return res.status(500).json({ error: "Failed to update hire request" });
    }
}
