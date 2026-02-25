import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export async function GET() {
    try {
        const caseStudies = await prisma.caseStudy.findMany({
            where: { isPublished: true },
            orderBy: { created_at: "desc" },
        });
        return NextResponse.json(caseStudies);
    } catch (error) {
        console.error("Error fetching case studies:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
