import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../lib/auth";

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id  } = req.params;
        const { approved } = req.body;

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: { approved: Boolean(approved) },
        });

        return res.json(testimonial);
    } catch (error) {
        console.error("Testimonial PATCH error:", error);
        return res.status(500).json({ error: "Failed to update testimonial" });
    }
}

export const DELETE = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id  } = req.params;

        await prisma.testimonial.delete({
            where: { id },
        });

        return res.json({ success: true });
    } catch (error) {
        console.error("Testimonial DELETE error:", error);
        return res.status(500).json({ error: "Failed to delete testimonial" });
    }
}
