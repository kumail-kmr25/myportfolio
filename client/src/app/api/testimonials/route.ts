import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { testimonialSchema } from "@portfolio/shared";
import { z } from "zod";
import { apiResponse, apiError } from "@/lib/rate-limit";

const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;

export const runtime = "nodejs";

const FALLBACK_TESTIMONIALS = [
    {
        id: "fallback-t-1",
        name: "Elite Client",
        role: "Software Architect",
        message: "Kumail is an exceptional engineer who delivers high-performance, scalable solutions with precision.",
        rating: 5,
        relationship_type: "Client",
        intervention_type: "Full Stack Development",
        created_at: new Date().toISOString()
    },
    {
        id: "fallback-t-2",
        name: "SaaS Founder",
        role: "CEO & Product Lead",
        message: "The architecture Kumail designed for our orchestration engine is rock solid. He transformed a complex problem into a clean, performant system.",
        rating: 5,
        relationship_type: "Partner",
        intervention_type: "System Architecture",
        created_at: new Date().toISOString()
    }
];

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { approved: true },
            orderBy: {
                created_at: "desc",
            },
        });

        const sanitizedTestimonials = testimonials.map((t: any) => {
            const { email, ...rest } = t;
            return {
                ...rest,
                created_at: rest.created_at.toISOString(),
            };
        });

        return apiResponse(sanitizedTestimonials);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return apiResponse(FALLBACK_TESTIMONIALS);
    }
}

export async function POST(request: Request) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "anonymous";
        const now = Date.now();

        const clientLimit = rateLimit.get(ip) || { count: 0, lastReset: now };

        if (now - clientLimit.lastReset > LIMIT_WINDOW) {
            clientLimit.count = 0;
            clientLimit.lastReset = now;
        }

        if (clientLimit.count >= MAX_REQUESTS) {
            return apiError("Submission frequency limit exceeded", 429);
        }

        clientLimit.count++;
        rateLimit.set(ip, clientLimit);

        const body = await request.json();
        const validatedData = testimonialSchema.parse(body);

        const { permission, ...dbData } = validatedData as any;

        const testimonial = await prisma.testimonial.create({
            data: {
                ...dbData,
                approved: false,
            },
        });

        const { email, ...rest } = testimonial as any;
        const sanitizedTestimonial = {
            ...rest,
            created_at: rest.created_at.toISOString(),
        };

        return apiResponse(sanitizedTestimonial, 201);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return apiError("Validation sequence rejected");
        }
        console.error("Error creating testimonial:", error);
        return apiError("Testimonial transmission failed");
    }
}
