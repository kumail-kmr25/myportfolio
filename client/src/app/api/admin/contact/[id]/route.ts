import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const { replied } = await request.json();
        const { id } = await params;

        const updated = await prisma.contactSubmission.update({
            where: { id },
            data: { replied },
        });

        return apiResponse(updated);
    } catch (error) {
        console.error("Admin contact PATCH error:", error);
        return apiError("Message status update failed");
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

        const existingMessage = await prisma.contactSubmission.findUnique({
            where: { id },
        });

        if (!existingMessage) return apiError("Resource non-existent", 404);

        await prisma.contactSubmission.delete({
            where: { id },
        });

        return apiResponse({ success: true });
    } catch (error) {
        console.error("Admin contact DELETE error:", error);
        return apiError("Failed to purge contact record");
    }
}
