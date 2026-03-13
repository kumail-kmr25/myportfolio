import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = 'nodejs';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const project = await prisma.project.findUnique({
            where: { id }
        });
        if (!project) return apiError("Project not found", 404);
        return apiResponse(project);
    } catch (error) {
        return apiError("Failed to fetch project");
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await req.json();
        const project = await prisma.project.update({
            where: { id },
            data: body
        });
        return apiResponse(project);
    } catch (error) {
        return apiError("Failed to update project");
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        await prisma.project.delete({
            where: { id }
        });
        return apiResponse({ success: true });
    } catch (error) {
        return apiError("Failed to delete project");
    }
}
