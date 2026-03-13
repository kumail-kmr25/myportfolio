import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return apiError("Unauthorized", 401);
        }

        const featureRequests = await prisma.featureRequest.findMany({
            orderBy: { created_at: "desc" },
        });
        return apiResponse(featureRequests);
    } catch (error) {
        console.error("Admin Feature Requests GET error:", error);
        return apiError("Failed to fetch feature requests");
    }
}
