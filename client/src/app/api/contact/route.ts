import { prisma } from "@portfolio/database";
import { contactSchema } from "@portfolio/shared";
import { sendContactNotification, sendAutoReplyToClient } from "@/lib/mail";
import xss from "xss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkRateLimit, getClientIP, apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const ip = getClientIP(request);
        const { isLimited, response: limitResponse } = checkRateLimit(ip, {
            windowMs: 60 * 60 * 1000,
            max: 5
        });

        if (isLimited && limitResponse) return limitResponse;

        const body = await request.json();
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return apiError("Validation failed", 400, result.error.format());
        }

        const {
            name,
            email,
            message,
            company, // Honeypot
            inquiryType,
            serviceRequired,
            budgetRange,
            timeline,
            foundBy
        } = result.data;

        // Honeypot check: If "company" is filled, it's likely a bot (real users don't see it)
        if (company) {
            console.warn("[BOT_PREVENTION] Honeypot triggered by", email);
            return apiResponse({ message: "Your message has been sent successfully!" }); // Fake success for bots
        }

        const sanitizedMessage = xss(message);
        const sanitizedName = xss(name);

        await prisma.contactSubmission.create({
            data: {
                name: sanitizedName,
                email,
                company: null, // Always null as the field is a honeypot
                inquiryType,
                serviceRequired,
                budgetRange: budgetRange || null,
                timeline: timeline || null,
                message: sanitizedMessage,
                foundBy: foundBy || null,
            },
        });

        sendContactNotification({
            name: sanitizedName,
            email,
            company: null,
            inquiryType: inquiryType || "General Inquiry",
            serviceRequired: serviceRequired || "Not specified",
            budgetRange: budgetRange || "Not specified",
            timeline: timeline || "Not specified",
            message: sanitizedMessage,
        }).catch((err) => console.error("Email notification failed:", err));

        sendAutoReplyToClient(email, sanitizedName)
            .catch((err) => console.error("Auto-reply failed:", err));

        return apiResponse({ message: "Your message has been sent successfully!" });
    } catch (error: any) {
        console.error("Contact API error:", error);
        return apiError(error.message || "Internal server error. Please try again later.");
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return apiError("Unauthorized", 401);
        }

        const messages = await prisma.contactSubmission.findMany({
            orderBy: { createdAt: "desc" },
        });
        return apiResponse(messages);
    } catch (error: any) {
        console.error("Contact GET error:", error);
        return apiError("Failed to fetch messages");
    }
}
