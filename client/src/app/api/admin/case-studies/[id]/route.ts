import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { caseStudySchema } from "@portfolio/shared";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const { id } = await params;
        const body = await request.json();

        const validatedData = caseStudySchema.partial().parse(body);

        const caseStudy = await prisma.caseStudy.update({
            where: { id },
            data: validatedData,
        });

        return apiResponse(caseStudy);
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return apiError("Domain validation failed: " + JSON.stringify((error as any).format()), 400);
        }
        console.error("Admin Case Study PATCH error:", error);
        return apiError("Engineering brief update failure");
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const { id } = await params;

        await prisma.caseStudy.delete({
            where: { id },
        });

        return apiResponse({ success: true });
    } catch (error) {
        console.error("Admin Case Study DELETE error:", error);
        return apiError("Asset removal sequence aborted");
    }
}
