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

        const { id } = await params;
        const data = await request.json();

        const phase = await prisma.journeyPhase.update({
            where: { id },
            data: {
                title: data.title,
                subtitle: data.description,
                ecoIcon: data.ecoIcon,
                ecoStage: data.ecoStage,
                dateRange: data.phase,
                order: data.order !== undefined ? parseInt(data.order.toString()) : undefined,
            },
        });

        return apiResponse(phase);
    } catch (error) {
        console.error("[API] Admin journey PATCH error:", error);
        return apiError("Failed to update journey phase");
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

        await prisma.journeyPhase.delete({
            where: { id },
        });

        return apiResponse({ success: true });
    } catch (error) {
        console.error("[API] Admin journey DELETE error:", error);
        return apiError("Failed to delete journey phase");
    }
}
