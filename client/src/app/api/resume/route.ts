import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const resume = await prisma.resume.findFirst({
            where: { visible: true },
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
        console.error("PUBLIC_RESUME_GET_ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
    }
}
