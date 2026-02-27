import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { contactSchema } from "@portfolio/shared";
import { sendContactNotification, sendAutoReplyToClient } from "@/lib/mail";
import xss from "xss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

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
            return NextResponse.json({ success: false, error: "Too many messages. Please try again in an hour." }, { status: 429 });
        }

        const body = await request.json();
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ success: false, error: "Validation failed", details: result.error.format() }, { status: 400 });
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

        const sanitizedMessage = xss(message);
        const sanitizedName = xss(name);
        const sanitizedCompany = company ? xss(company) : null;

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

        clientLimit.count++;
        rateLimit.set(ip, clientLimit);

        sendContactNotification({
            name: sanitizedName,
            email,
            company: sanitizedCompany,
            inquiryType: inquiryType || "General Inquiry",
            serviceRequired: serviceRequired || "Not specified",
            budgetRange: budgetRange || "Not specified",
            timeline: timeline || "Not specified",
            message: sanitizedMessage,
        }).catch((err) => console.error("Email notification failed:", err));

        sendAutoReplyToClient(email, sanitizedName)
            .catch((err) => console.error("Auto-reply failed:", err));

        return NextResponse.json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error: any) {
        console.error("Contact API error:", error);
        return NextResponse.json({ success: false, error: error.message || "Internal server error. Please try again later." }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
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
