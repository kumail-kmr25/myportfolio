import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../lib/auth";
import { projectSchema } from "@portfolio/shared";

export const GET = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                created_at: "desc",
            },
        });
        return res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(500).json({ error: "Failed to fetch projects" });
    }
}

export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const body = req.body;
        const validatedData = projectSchema.parse(body);

        const project = await prisma.project.create({
            data: validatedData,
        });

        return res.status(201).json(project);
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return res.status(400).json({ error: (error as any).format() });
        }
        console.error("Error creating project:", error);
        return res.status(500).json({ error: "Failed to create project" });
    }
}
