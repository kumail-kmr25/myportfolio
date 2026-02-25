import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { created_at: "desc" },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Blog GET error:", error);
        return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, excerpt, content, category, readTime, published } = await request.json();

        if (!title || !excerpt || !content || !category) {
            return NextResponse.json({ error: "Title, excerpt, content, and category are required." }, { status: 400 });
        }

        const post = await prisma.blogPost.create({
            data: {
                title,
                excerpt,
                content,
                category,
                readTime: readTime || "5 min read",
                published: published ?? true,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Blog POST error:", error);
        return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
    }
}
