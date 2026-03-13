import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const { status } = await request.json();

        const existing = await prisma.systemConfig.findFirst();
        if (existing) {
            await prisma.systemConfig.update({
                where: { id: existing.id },
                data: { manualOverride: status }
            });
        }

        return apiResponse({ success: true });
    } catch (error) {
        console.error("ADMIN_AVAILABILITY_PATCH_ERROR:", error);
        return apiError("System override failure");
    }
}
