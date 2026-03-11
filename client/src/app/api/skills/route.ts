import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const runtime = "nodejs";

const FALLBACK_SKILLS = [
    { name: "TypeScript", status: "expert", order: 1 },
    { name: "Next.js", status: "expert", order: 2 },
    { name: "PostgreSQL", status: "expert", order: 3 }
];

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(skills);
    } catch (error) {
        console.error("[API] Error fetching skills:", error);
        return NextResponse.json(FALLBACK_SKILLS);
    }
}
