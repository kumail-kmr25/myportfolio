import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../../lib/auth";
import { featureRequestSchema } from "@portfolio/shared";

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "building", "completed"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const featureRequest = await prisma.featureRequest.update({
            where: { id },
            data: { status },
        });

        return res.json(featureRequest);
    } catch (error) {
        console.error("Admin Feature Request PATCH error:", error);
        return res.status(500).json({ error: "Failed to update feature request" });
    }
}
