import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

// Admin endpoint: fetch ALL testimonials (including unapproved)
export const GET = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const testimonials = await prisma.testimonial.findMany({
            orderBy: { created_at: "desc" },
        });

        return res.json(testimonials);
    } catch (error) {
        console.error("Admin testimonials error:", error);
        return res.status(500).json({ error: "Failed to fetch testimonials" });
    }
}
export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id, approved } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Testimonial ID is required" });
        }

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: { approved },
        });

        return res.json(testimonial);
    } catch (error) {
        console.error("Admin testimonials PATCH error:", error);
        return res.status(500).json({ error: "Failed to update testimonial" });
    }
}
