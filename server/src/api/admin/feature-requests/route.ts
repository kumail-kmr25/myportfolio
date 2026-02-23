import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

export const GET = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const featureRequests = await prisma.featureRequest.findMany({
            orderBy: { created_at: "desc" },
        });
        return res.json(featureRequests);
    } catch (error) {
        console.error("Admin Feature Requests GET error:", error);
        return res.status(500).json({ error: "Failed to fetch feature requests" });
    }
}
