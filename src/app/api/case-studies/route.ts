/**/
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const db = prisma as any;
        const caseStudies = await db.caseStudy.findMany({
            where: { isPublished: true },
            orderBy: { created_at: "desc" },
        });
        return NextResponse.json(caseStudies);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
