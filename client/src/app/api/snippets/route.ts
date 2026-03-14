import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const snippets = await prisma.codeSnippet.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' }
        });
        
        return apiResponse({ snippets, version: "v1.0.0" });
    } catch (error) {
        console.error("GET_SNIPPETS_ERROR:", error);
        return apiError("Failed to fetch snippets");
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await req.json();
        const snippet = await prisma.codeSnippet.create({
            data: {
                ...body,
                tags: body.tags || [],
            }
        });
        return apiResponse(snippet);
    } catch (error) {
        console.error("POST_SNIPPET_ERROR:", error);
        return apiError("Code snippet creation failed");
    }
}
