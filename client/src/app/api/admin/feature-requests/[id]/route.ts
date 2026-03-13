import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
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

        const { id } = await params;
        const { status } = await request.json();

        const updated = await prisma.featureRequest.update({
            where: { id },
            data: { status }
        });

        return apiResponse(updated);
    } catch (error) {
        console.error("Admin Feature Request PATCH error:", error);
        return apiError("Roadmap integration sync failure");
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

        await prisma.featureRequest.delete({ where: { id } });

        return apiResponse({ success: true });
    } catch (error) {
        console.error("Admin Feature Request DELETE error:", error);
        return apiError("Failed to prune feature request");
    }
}
