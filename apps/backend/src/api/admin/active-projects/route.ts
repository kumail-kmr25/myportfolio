import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

export const GET = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const db = prisma as any;
        const projects = await db.activeProject.findMany({
            orderBy: { createdAt: "desc" }
        });
        return res.status(500).json(projects);
    } catch (error) {
        return res.json({ error: "Failed to fetch" });
    }
}

export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) return res.status(401).json({ error: "Unauthorized" });

        const body = req.body;
        const { clientName, projectTitle, status, startDate, expectedEndDate } = body;

        if (!clientName || !projectTitle || !status || !startDate || !expectedEndDate) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const db = prisma as any;
        const project = await db.activeProject.create({
            data: {
                clientName,
                projectTitle,
                status,
                startDate: new Date(startDate),
                expectedEndDate: new Date(expectedEndDate)
            }
        });
        return res.status(201).json(project);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create" });
    }
}
