import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas/contact";
import { sendContactNotification } from "@/lib/mail";
import xss from "xss";

// In-memory rate limiting (simple implementation)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "anonymous";
        const now = Date.now();

        // Rate Limiting Logic
        const clientLimit = rateLimit.get(ip) || { count: 0, lastReset: now };
        if (now - clientLimit.lastReset > LIMIT_WINDOW) {
            clientLimit.count = 0;
            clientLimit.lastReset = now;
        }

        if (clientLimit.count >= MAX_REQUESTS) {
            return NextResponse.json(
                { success: false, error: "Too many messages. Please try again in an hour." },
                { status: 429 }
            );
        }

        const body = await req.json();

        // Validation
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return new Response(JSON.stringify({ success: false, error: "Validation failed", details: result.error.format() }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const {
            name,
            email,
            message,
            company,
            inquiryType,
            serviceRequired,
            budgetRange,
            timeline,
            foundBy
        } = result.data;

        // Sanitization
        const sanitizedMessage = xss(message);
        const sanitizedName = xss(name);
        const sanitizedCompany = company ? xss(company) : null;

        // Save to Database
        const submission = await prisma.contactSubmission.create({
            data: {
                name: sanitizedName,
                email,
                company: sanitizedCompany,
                inquiryType,
                serviceRequired,
                budgetRange: budgetRange || null,
                timeline: timeline || null,
                message: sanitizedMessage,
                foundBy: foundBy || null,
            },
        });

        // Update Rate Limit
        clientLimit.count++;
        rateLimit.set(ip, clientLimit);

        // Send Email (Non-blocking)
        sendContactNotification({
            name: sanitizedName,
            email,
            company: sanitizedCompany,
            inquiryType,
            serviceRequired,
            budgetRange: budgetRange || "Not specified",
            timeline: timeline || "Not specified",
            message: sanitizedMessage,
        }).catch((err) => console.error("Email notification failed:", err));

        return NextResponse.json(
            { success: true, message: "Your message has been sent successfully!" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Contact API error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message || "Internal server error. Please try again later." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// Block other methods
export async function GET(req: NextRequest) {
    try {
        const { getSession } = await import("@/lib/auth");
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const messages = await prisma.contactSubmission.findMany({
            orderBy: { created_at: "desc" },
        });
        return NextResponse.json(messages);
    } catch (error: any) {
        console.error("Contact GET error:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}
export async function PUT() { return NextResponse.json({ error: "Method not allowed" }, { status: 405 }); }
export async function DELETE() { return NextResponse.json({ error: "Method not allowed" }, { status: 405 }); }
