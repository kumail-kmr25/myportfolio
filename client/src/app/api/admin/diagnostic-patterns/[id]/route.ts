import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const { id } = await params;
        const body = await request.json();

        const updated = await prisma.issuePattern.update({
            where: { id },
            data: body
        });

        return apiResponse(updated);
    } catch (error) {
        console.error("IssuePattern PATCH error:", error);
        return apiError("Failed to update pattern");
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
        await prisma.issuePattern.delete({ where: { id } });

        return apiResponse({ success: true });
    } catch (error) {
        console.error("IssuePattern DELETE error:", error);
        return apiError("Failed to delete pattern");
    }
}
