import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { getSession } from "../../../../lib/auth";
import { caseStudySchema } from "@portfolio/shared";

export const PATCH = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;
        const body = req.body;

        // Partial validation for PATCH
        const validatedData = caseStudySchema.partial().parse(body);

        const caseStudy = await prisma.caseStudy.update({
            where: { id },
            data: validatedData,
        });

        return res.status(400).json(caseStudy);
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return res.status(400).json({ error: (error as any).format() });
        }
        console.error("Admin Case Study PATCH error:", error);
        return res.status(500).json({ error: "Failed to update case study" });
    }
}

export const DELETE = async (req: Request, res: Response) => {
    try {
        const session = await getSession();
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;

        await prisma.caseStudy.delete({
            where: { id },
        });

        return res.json({ success: true });
    } catch (error) {
        console.error("Admin Case Study DELETE error:", error);
        return res.status(500).json({ error: "Failed to delete case study" });
    }
}
