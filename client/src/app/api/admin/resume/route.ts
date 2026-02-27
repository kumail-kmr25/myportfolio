import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const resume = await prisma.resume.findFirst({
            orderBy: { updatedAt: 'desc' }
        });

        if (!resume) {
            return NextResponse.json({
                url: null,
                updatedAt: null,
                visible: false
            });
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error("RESUME_GET_ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { url, visible } = body;

        const resume = await prisma.resume.upsert({
            where: { id: "current-resume" },
            update: { url, visible, updatedAt: new Date() },
            create: { id: "current-resume", url, visible, updatedAt: new Date() }
        });

        return NextResponse.json(resume);
    } catch (error) {
        console.error("RESUME_POST_ERROR:", error);
        return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
    }
}
