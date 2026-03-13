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

        const body = await request.json();
        const { id } = await params;

        const data: any = { ...body };
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.expectedEndDate) data.expectedEndDate = new Date(data.expectedEndDate);

        const project = await prisma.activeProject.update({
            where: { id },
            data
        });
        return apiResponse(project);
    } catch (error) {
        console.error("ActiveProject PATCH error:", error);
        return apiError("Failed to update active project");
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
        await prisma.activeProject.delete({ where: { id } });
        return apiResponse({ success: true });
    } catch (error) {
        console.error("ActiveProject DELETE error:", error);
        return apiError("Failed to delete active project");
    }
}
