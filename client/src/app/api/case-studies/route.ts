import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const runtime = "nodejs";

const FALLBACK_CASES = [
    {
        id: "fallback-cs-1",
        title: "Memory Leak in Real-time Inventory",
        errorMessage: "Allocation failed - JavaScript heap out of memory",
        rootCause: "Unbounded event listener accumulation.",
        solution: "Implemented defensive cleanup pattern.",
        impact: "Stable memory footprint sustained under load.",
        techStack: ["Node.js", "Socket.io"],
        isPublished: true,
        created_at: new Date().toISOString()
    }
];

export async function GET() {
    try {
        const caseStudies = await prisma.caseStudy.findMany({
            where: { isPublished: true },
            orderBy: { created_at: "desc" },
        });
        return NextResponse.json(caseStudies);
    } catch (error) {
        console.error("Error fetching case studies:", error);
        return NextResponse.json(FALLBACK_CASES);
    }
}
