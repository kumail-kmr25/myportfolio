import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const resume = await prisma.resume.findFirst({
            orderBy: { updatedAt: 'desc' }
        });

        if (!resume) {
            return NextResponse.json({
                success: true,
                data: {
                    url: null,
                    updatedAt: null,
                    visible: false
                }
            });
        }

        return NextResponse.json({ success: true, data: resume });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
