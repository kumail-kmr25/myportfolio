import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const FALLBACK_RESUME = {
    url: null,
    updatedAt: null,
    visible: false
};

export async function GET() {
    try {
        const resume = await prisma.resume.findFirst({
            where: { visible: true },
            orderBy: { updatedAt: 'desc' }
        });

        if (!resume) {
            return NextResponse.json(FALLBACK_RESUME);
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error("PUBLIC_RESUME_GET_ERROR:", error);
        return NextResponse.json(FALLBACK_RESUME);
    }
}
