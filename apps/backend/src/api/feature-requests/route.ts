import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { featureRequestSchema } from "@portfolio/shared";

export const GET = async (req: Request, res: Response) => {
    try {
        const completedRequests = await prisma.featureRequest.findMany({
            where: { status: "completed" },
            orderBy: { created_at: "desc" },
            take: 5, // Show recently completed 5 suggestions
        });
        return res.json(completedRequests);
    } catch (error) {
        console.error("Error fetching completed feature requests:", error);
        return res.status(500).json({ error: "Failed to fetch feature requests" });
    }
}

export const POST = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const validatedData = featureRequestSchema.parse(body);

        const featureRequest = await prisma.featureRequest.create({
            data: validatedData,
        });

        return res.status(201).json(featureRequest);
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return res.status(400).json({ error: (error as any).format() });
        }
        console.error("Error creating feature request:", error);
        return res.status(500).json({ error: "Failed to submit feature request" });
    }
}
