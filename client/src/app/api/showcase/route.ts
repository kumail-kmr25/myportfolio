import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export async function GET() {
    try {
        const showcase = await prisma.componentShowcase.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: showcase });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
