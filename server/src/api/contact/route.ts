import { Request, Response } from 'express';
import { prisma } from '@portfolio/database';
import { contactSchema } from "@portfolio/shared";
import { sendContactNotification, sendAutoReplyToClient } from "../../lib/mail";
import xss from "xss";

export const dynamic = 'force-dynamic';

// In-memory rate limiting (simple implementation)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

export const POST = async (req: Request, res: Response) => {
    try {
        const ip = req.header("x-forwarded-for") || "anonymous";
        const now = Date.now();

        // Rate Limiting Logic
        const clientLimit = rateLimit.get(ip) || { count: 0, lastReset: now };
        if (now - clientLimit.lastReset > LIMIT_WINDOW) {
            clientLimit.count = 0;
            clientLimit.lastReset = now;
        }

        if (clientLimit.count >= MAX_REQUESTS) {
            return res.status(429).json({ success: false, error: "Too many messages. Please try again in an hour." });
        }

        const body = req.body;

        // Validation
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return res.status(400).json({ success: false, error: "Validation failed", details: result.error.format() });
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

        // Auto-reply to Client (Non-blocking)
        sendAutoReplyToClient(email, sanitizedName)
            .catch((err) => console.error("Auto-reply failed:", err));

        return res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error: any) {
        console.error("Contact API error:", error);
        return res.status(500).json({ success: false, error: error.message || "Internal server error. Please try again later." });
    }
}

// Block other methods
export const GET = async (req: Request, res: Response) => {
    try {
        const { getSession } = await import("../../lib/auth");
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const messages = await prisma.contactSubmission.findMany({
            orderBy: { created_at: "desc" },
        });
        return res.json(messages);
    } catch (error: any) {
        console.error("Contact GET error:", error);
        return res.status(500).json({ error: "Failed to fetch messages" });
    }
}
export const PUT = async (req: Request, res: Response) => { return res.status(405).json({ error: "Method not allowed" }); }
export const DELETE = async (req: Request, res: Response) => { return res.status(405).json({ error: "Method not allowed" }); }
