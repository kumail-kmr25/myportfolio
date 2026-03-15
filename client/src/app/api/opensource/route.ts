import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export async function GET() {
    try {
        const contributions = await prisma.openSourceContribution.findMany({
            orderBy: { stars: 'desc' }
        });
        return NextResponse.json({ success: true, data: contributions });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
