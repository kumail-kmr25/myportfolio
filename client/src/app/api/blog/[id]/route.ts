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
        const body = await request.json();
        const { title, excerpt, content, category, readTime, published } = body;

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                title,
                excerpt,
                content,
                category,
                readTime: readTime || "5 min read",
                published: published ?? true,
            },
        });

        return apiResponse(post);
    } catch (error) {
        console.error("Blog PATCH error:", error);
        return apiError("Publishing update failure");
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

        await prisma.blogPost.delete({
            where: { id },
        });

        return apiResponse({ success: true });
    } catch (error) {
        console.error("Blog DELETE error:", error);
        return apiError("Content purge sequence failed");
    }
}
