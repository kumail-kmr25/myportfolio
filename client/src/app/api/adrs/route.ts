import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export async function GET() {
    try {
        const adrs = await prisma.architectureDecision.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: adrs });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
