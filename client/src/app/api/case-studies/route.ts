import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

import { apiResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

const FALLBACK_CASES = [
    {
        id: "fallback-cs-1",
        title: "Memory Leak in Real-time Inventory",
        errorMessage: "Allocation failed - JavaScript heap out of memory",
        rootCause: "Unbounded event listener accumulation.",
        solution: "Implemented defensive cleanup pattern.",
        impact: "Stable memory footprint sustained under load.",
        steps: ["Event loop analysis", "Heap snapshot comparison", "Defensive cleanup implementation"],
        techStack: ["Node.js", "Socket.io"],
        architecture: {
            nodes: [
                { id: "front", x: 20, y: 50, label: "Frontend", sub: "Next.js UI", color: "blue" },
                { id: "api", x: 50, y: 50, label: "API", sub: "Node.js Logic", color: "purple" },
                { id: "db", x: 80, y: 50, label: "Database", sub: "Redis Cache", color: "emerald" }
            ],
            edges: [
                { from: "front", to: "api" },
                { from: "api", to: "db" }
            ]
        },
        isPublished: true,
        createdAt: new Date().toISOString()
    }
];

export async function GET() {
    try {
        const caseStudies = await prisma.caseStudy.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: "desc" },
        });
        return apiResponse(caseStudies);
    } catch (error) {
        console.error("Error fetching case studies:", error);
        return apiResponse(FALLBACK_CASES);
    }
}
