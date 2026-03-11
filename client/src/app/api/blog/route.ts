import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

const FALLBACK_POSTS = [
    {
        id: "fallback-blog-1",
        title: "Architecting for Scale",
        excerpt: "Exploring the distributed locking patterns used to build the FinFlow AI engine.",
        category: "Engineering",
        readTime: "12 min read",
        published: true,
        created_at: new Date().toISOString()
    }
];

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { created_at: "desc" },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Blog GET error:", error);
        return NextResponse.json(FALLBACK_POSTS);
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
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
