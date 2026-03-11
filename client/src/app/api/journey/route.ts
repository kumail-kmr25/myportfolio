import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const runtime = "nodejs";

const FALLBACK_PHASES = [
    {
        id: "fallback-journey-1",
        phase: "Phase 1",
        title: "Foundation & Core Engineering",
        description: "Mastering complex data structures and specialized algorithms to build high-performance foundations.",
        icon: "Brain",
        color: "from-blue-600/20 to-indigo-600/20",
        order: 1,
        actionLabel: "Explore Foundation",
        actionUrl: "#skills"
    },
    {
        id: "fallback-journey-2",
        phase: "Phase 2",
        title: "Full-Stack Orchestration",
        description: "Architecting end-to-end systems that bridge sophisticated backend logic with intuitive interfaces.",
        icon: "Code2",
        color: "from-indigo-600/20 to-purple-600/20",
        order: 2,
        actionLabel: "View Case Studies",
        actionUrl: "#projects"
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
