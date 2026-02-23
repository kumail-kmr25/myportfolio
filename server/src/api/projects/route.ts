import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../lib/auth";
import { projectSchema } from "@portfolio/shared";

export const GET = async (req: Request, res: Response) => {
    try {
        console.log("[API] Fetching projects...");
        const projects = await prisma.project.findMany({
            orderBy: {
                created_at: "desc",
            },
        });
        console.log(`[API] Successfully fetched ${projects.length} projects`);
        return res.json(projects);
    } catch (error) {
        console.error("[API] Error fetching projects:", error);
        if (error instanceof Error) {
            console.error("[API] Error details:", {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }
        return res.status(500).json({
            error: "Failed to fetch projects",
            details: error instanceof Error ? error.message : "Unknown error",
            hint: "Check if MongoDB is running and your connection string in .env is correct."
        });
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
