import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { title, excerpt, content, category, readTime, published } = await request.json();

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

        return NextResponse.json(post);
    } catch (error) {
        console.error("Blog PATCH error:", error);
        return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        await prisma.blogPost.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Blog DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
    }
}
