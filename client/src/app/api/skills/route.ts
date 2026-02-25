import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(skills);
    } catch (error) {
        console.error("[API] Error fetching skills:", error);
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
    }
}
