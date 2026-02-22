import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hireSchema } from "@/lib/schemas/hire";
import { sendHireNotification, sendHireAutoReply } from "@/lib/mail";
import xss from "xss";

export const dynamic = 'force-dynamic';

// In-memory rate limiting
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3; // Stricter for hire requests

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "anonymous";
        const now = Date.now();

        // Rate Limiting
        const clientLimit = rateLimit.get(ip) || { count: 0, lastReset: now };
        if (now - clientLimit.lastReset > LIMIT_WINDOW) {
            clientLimit.count = 0;
            clientLimit.lastReset = now;
        }

        if (clientLimit.count >= MAX_REQUESTS) {
            return NextResponse.json(
                { success: false, error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body = await req.json();

        // Validation
        const result = hireSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { success: false, error: "Validation failed", details: result.error.format() },
                { status: 400 }
            );
        }

        const {
            name,
            email,
            company,
            selectedService,
            budgetRange,
            timeline,
            projectType,
            description,
            source
        } = result.data;

        // Sanitization
        const sanitizedDescription = xss(description);
        const sanitizedName = xss(name);
        const sanitizedCompany = company ? xss(company) : null;

        // Save to Database
        const hireRequest = await prisma.hireRequest.create({
            data: {
                name: sanitizedName,
                email,
                company: sanitizedCompany,
                description: sanitizedDescription,
                selectedService,
                budgetRange: budgetRange,
                timeline: timeline,
                projectType: projectType,
                source: source || "hire_me",
                status: "new"
            },
        });

        // Update Rate Limit
        clientLimit.count++;
        rateLimit.set(ip, clientLimit);

        // Send Email Notifications (Non-blocking)
        sendHireNotification({
            name: sanitizedName,
            email,
            company: sanitizedCompany,
            selectedService,
            budgetRange,
            timeline,
            projectType,
            description: sanitizedDescription,
        }).catch((err) => console.error("Hire notification email failed:", err));

        sendHireAutoReply(email, sanitizedName)
            .catch((err) => console.error("Hire auto-reply email failed:", err));

        return NextResponse.json(
            { success: true, message: "Hire request submitted successfully!", id: hireRequest.id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Hire API error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
