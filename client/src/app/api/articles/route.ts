import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        
        const articles = await prisma.article.findMany({
            where: {
                published: true,
                ...(category ? { category } : {})
            },
            orderBy: { publishedAt: 'desc' }
        });
        
        return apiResponse({ articles });
    } catch (error) {
        console.error("GET_ARTICLES_ERROR:", error);
        return apiError("Failed to fetch articles");
    }
}
