import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;
        const body = req.body;
        const { title, description, tags, image, demo, deployment, github, beforeImageUrl, afterImageUrl, improvementDetails, metrics } = body;

        const project = await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                tags,
                image,
                demo,
                deployment,
                github,
                beforeImageUrl,
                afterImageUrl,
                improvementDetails,
                metrics,
            },
        });

        return res.json(project);
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ error: "Failed to update project" });
    }
}

export const DELETE = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;

        await prisma.project.delete({
            where: { id },
        });

        return res.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ error: "Failed to delete project" });
    }
}
