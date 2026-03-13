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
        const { approved } = await request.json();

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: { approved: Boolean(approved) },
        });

        return apiResponse(testimonial);
    } catch (error) {
        console.error("Testimonial PATCH error:", error);
        return apiError("Failed to update testimonial");
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

        await prisma.testimonial.delete({
            where: { id },
        });

        return apiResponse({ success: true });
    } catch (error) {
        console.error("Testimonial DELETE error:", error);
        return apiError("Failed to delete testimonial");
    }
}
