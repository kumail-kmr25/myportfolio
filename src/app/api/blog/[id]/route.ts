import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
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

        return NextResponse.json(post);
    } catch (error) {
        console.error("Blog PATCH error:", error);
        return NextResponse.json(
            { error: "Failed to update blog post" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
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
        return NextResponse.json(
            { error: "Failed to delete blog post" },
            { status: 500 }
        );
    }
}
