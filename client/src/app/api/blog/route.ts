import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

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
        return apiResponse(posts);
    } catch (error) {
        console.error("Blog GET error:", error);
        return apiResponse(FALLBACK_POSTS);
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await request.json();
        const { title, excerpt, content, category, readTime, published } = body;

        if (!title || !excerpt || !content || !category) {
            return apiError("Missing required blog parameters", 400);
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

        return apiResponse(post, 201);
    } catch (error) {
        console.error("Blog POST error:", error);
        return apiError("Failed to publish blog post");
    }
}
