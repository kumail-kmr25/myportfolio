import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const testimonialSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    intervention_type: z.enum([
        "UI/UX Design",
        "DevOps / Cloud",
        "Frontend",
        "Backend",
        "Database Design",
        "Bug Fix / Error Optimisation",
        "Full Stack Development",
        "Others",
    ]),
    message: z.string().min(1, "Message is required"),
    rating: z.number().min(1).max(7),
    about_delivery_lead: z.string().min(1, "About the delivery lead is required"),
});

// Basic in-memory rate limiting (use Redis for production)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function GET() {
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

        return NextResponse.json(sanitizedTestimonials);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch testimonials" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "anonymous";
        const now = Date.now();

        const clientLimit = rateLimit.get(ip) || { count: 0, lastReset: now };

        if (now - clientLimit.lastReset > LIMIT_WINDOW) {
            clientLimit.count = 0;
            clientLimit.lastReset = now;
        }

        if (clientLimit.count >= MAX_REQUESTS) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        clientLimit.count++;
        rateLimit.set(ip, clientLimit);

        const body = await req.json();
        const validatedData = testimonialSchema.parse(body);

        const testimonial = await prisma.testimonial.create({
            data: validatedData,
        });

        const { email, ...sanitizedTestimonial } = testimonial;

        return NextResponse.json(sanitizedTestimonial, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify({ error: error.format() }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        console.error("Error creating testimonial:", error);
        return new Response(JSON.stringify({ error: "Failed to create testimonial" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
