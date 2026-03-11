import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const runtime = "nodejs";

const FALLBACK_PHASES = [
    {
        id: "fallback-journey-1",
        phase: "Step 1",
        title: "Foundation & Core Engineering",
        description: "Established a robust engineering foundation, mastering modern web architectures.",
        icon: "Brain",
        color: "from-blue-500/20 to-indigo-500/20",
        order: 1
    },
    {
        id: "fallback-journey-2",
        phase: "Step 2",
        title: "Full-Stack Orchestration",
        description: "Developed deep expertise in full-stack orchestration and database systems.",
        icon: "Code2",
        color: "from-indigo-500/20 to-purple-500/20",
        order: 2
    }
];

export async function GET() {
    try {
        const phases = await prisma.journeyPhase.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(phases);
    } catch (error) {
        console.error("[API] Error fetching journey phases:", error);
        return NextResponse.json(FALLBACK_PHASES);
    }
}
