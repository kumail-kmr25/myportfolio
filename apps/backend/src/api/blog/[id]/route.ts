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
        const { title, excerpt, content, category, readTime, published } = body;

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                title,
                excerpt,
                content,
                category,
                readTime: readTime || "5 min read",
                published: published ?? true,
            },
        });

        return res.json(post);
    } catch (error) {
        console.error("Blog PATCH error:", error);
        return res.status(500).json({ error: "Failed to update blog post" });
    }
}

export const DELETE = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;

        await prisma.blogPost.delete({
            where: { id },
        });

        return res.json({ success: true });
    } catch (error) {
        console.error("Blog DELETE error:", error);
        return res.status(500).json({ error: "Failed to delete blog post" });
    }
}
