import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const { id } = await params;
        if (!id) return apiError("ID is required", 400);

        await prisma.hireRequest.delete({
            where: { id }
        });

        return apiResponse({ message: "Hire request deleted successfully" });
    } catch (error) {
        console.error("Admin hire DELETE error:", error);
        return apiError("Failed to delete hire request");
    }
}
