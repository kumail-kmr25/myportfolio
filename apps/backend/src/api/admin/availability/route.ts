import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const { status } = req.body;
        const db = prisma as any;

        // Update the admin found in session
        await db.admin.updateMany({
            where: { email: session.user.email },
            data: { availabilityStatus: status }
        });

        return res.status(500).json({ success: true });
    } catch (error) {
        return res.json({ error: "Failed to update availability" });
    }
}
