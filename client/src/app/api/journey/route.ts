import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export async function GET() {
    try {
        const phases = await prisma.journeyPhase.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(phases);
    } catch (error) {
        console.error("[API] Error fetching journey phases:", error);
        return NextResponse.json({ error: "Failed to fetch journey phases" }, { status: 500 });
    }
}
