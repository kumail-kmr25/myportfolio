import { prisma } from "@portfolio/database";
import { hireSchema } from "@portfolio/shared";
import { sendHireNotification, sendHireAutoReply } from "@/lib/mail";
import xss from "xss";
import { checkRateLimit, getClientIP, apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const ip = getClientIP(request);
        const { isLimited, response: limitResponse } = checkRateLimit(ip, {
            windowMs: 60 * 60 * 1000,
            max: 3 // Stricter for hire requests
        });

        if (isLimited && limitResponse) return limitResponse;

        const body = await request.json();

        // Validation
        const result = hireSchema.safeParse(body);
        if (!result.success) {
            return apiError("Validation failed", 400, result.error.format());
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
            referenceLink,
            contactMethod,
            source
        } = result.data;

        // Sanitization
        const sanitizedDescription = xss(description);
        const sanitizedName = xss(name);
        const sanitizedCompany = company ? xss(company) : null;
        const sanitizedReferenceLink = referenceLink ? xss(referenceLink) : null;

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
                referenceLink: sanitizedReferenceLink,
                contactMethod: contactMethod,
                source: source || "hire_me",
                status: "new"
            },
        });

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

        return apiResponse({ message: "Hire request submitted successfully!", id: hireRequest.id }, 201);
    } catch (error: any) {
        console.error("Hire API EXCEPTION:", error);
        return apiError(error.message || "Internal server error");
    }
}
