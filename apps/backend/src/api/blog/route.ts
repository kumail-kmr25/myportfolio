import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../lib/auth";

export const GET = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { created_at: "desc" },
        });
        return res.json(posts);
    } catch (error) {
        console.error("Blog GET error:", error);
        return res.status(500).json({ error: "Failed to fetch blog posts" });
    }
}

export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { title, excerpt, content, category, readTime, published } = req.body;

        if (!title || !excerpt || !content || !category) {
            return res.status(400).json({ error: "Title, excerpt, content, and category are required." });
        }

        const post = await prisma.blogPost.create({
            data: {
                title,
                excerpt,
                content,
                category,
                readTime: readTime || "5 min read",
                published: published ?? true,
            },
        });

        return res.status(201).json(post);
    } catch (error) {
        console.error("Blog POST error:", error);
        return res.status(500).json({ error: "Failed to create blog post" });
    }
}
