import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const resume = await prisma.resume.findFirst({
            where: { visible: true },
            orderBy: { createdAt: "desc" }
        });

        if (!resume) {
            return NextResponse.json({ error: "Resume not found or currently hidden" }, { status: 404 });
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error("Resume GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
