import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { z } from "zod";
import { testimonialSchema } from "@portfolio/shared";

// Basic in-memory rate limiting (use Redis for production)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export const GET = async (req: Request, res: Response) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { approved: true },
            orderBy: {
                created_at: "desc",
            },
        });

        // Sanitize: remove email from public display
        const sanitizedTestimonials = testimonials.map((t: any) => {
            const { email, ...rest } = t;
            return {
                ...rest,
                created_at: rest.created_at.toISOString(),
            };
        });

        return res.json(sanitizedTestimonials);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return res.status(500).json({ error: "Failed to fetch testimonials" });
    }
}

export const POST = async (req: Request, res: Response) => {
    try {
        const ip = req.header("x-forwarded-for") || "anonymous";
        const now = Date.now();

        const clientLimit = rateLimit.get(ip) || { count: 0, lastReset: now };

        if (now - clientLimit.lastReset > LIMIT_WINDOW) {
            clientLimit.count = 0;
            clientLimit.lastReset = now;
        }

        if (clientLimit.count >= MAX_REQUESTS) {
            return res.status(429).json({ error: "Too many requests. Please try again later." });
        }

        clientLimit.count++;
        rateLimit.set(ip, clientLimit);

        const body = req.body;
        const validatedData = testimonialSchema.parse(body);

        // Strip frontend-only fields before persisting
        const { permission, ...dbData } = validatedData;

        const testimonial = await prisma.testimonial.create({
            data: {
                ...dbData,
                approved: false,
            },
        });

        // Sanitize: remove email from response and convert created_at to ISO string
        const { email, ...rest } = testimonial;
        const sanitizedTestimonial = {
            ...rest,
            created_at: rest.created_at.toISOString(),
        };

        return res.status(201).json(sanitizedTestimonial);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: "Validation failed", details: error.format() });
        }
        console.error("Error creating testimonial:", error);
        return res.status(500).json({ error: "Failed to create testimonial" });
    }
}
