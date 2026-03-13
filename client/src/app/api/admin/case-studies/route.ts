import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { caseStudySchema } from "@portfolio/shared";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const caseStudies = await prisma.caseStudy.findMany({ orderBy: { created_at: "desc" } });
        return apiResponse(caseStudies);
    } catch (error) {
        return apiError("Failed to fetch");
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await request.json();
        const validatedData = caseStudySchema.parse(body);

        const caseStudy = await prisma.caseStudy.create({ data: validatedData });
        return apiResponse(caseStudy);
    } catch (error) {
        console.error("Admin Case Study POST error:", error);
        if (error instanceof Error && error.name === "ZodError") {
            return apiError("Validation failed", 400);
        }
        return apiError("Failed to create");
    }
}
