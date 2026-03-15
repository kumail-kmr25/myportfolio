import { prisma } from "@portfolio/database";
import { featureRequestSchema } from "@portfolio/shared";
import xss from "xss";
import { checkRateLimit, getClientIP, apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET() {
    try {
        const completedRequests = await prisma.featureRequest.findMany({
            where: { status: "completed" },
            orderBy: { createdAt: "desc" },
            take: 10
        });
        return apiResponse(completedRequests);
    } catch (error) {
        return apiError("Failed to fetch features", 500);
    }
}

export async function POST(request: Request) {
    try {
        const ip = getClientIP(request);
        const { isLimited, response: limitResponse } = checkRateLimit(ip, {
            windowMs: 60 * 60 * 1000,
            max: 5
        });

        if (isLimited && limitResponse) return limitResponse;

        const body = await request.json();

        const result = featureRequestSchema.safeParse(body);
        if (!result.success) {
            return apiError("Validation failed", 400, result.error.format());
        }

        const { name, email, message, category } = result.data;

        const featureRequest = await prisma.featureRequest.create({
            data: {
                name: xss(name),
                email,
                message: xss(message),
                category,
                status: "pending"
            }
        });

        return apiResponse({ id: featureRequest.id });
    } catch (error) {
        console.error("Feature request POST error:", error);
        return apiError("Failed to submit feature request");
    }
}
