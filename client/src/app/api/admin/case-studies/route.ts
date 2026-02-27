import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { caseStudySchema } from "@portfolio/shared";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const caseStudies = await prisma.caseStudy.findMany({ orderBy: { created_at: "desc" } });
        return NextResponse.json(caseStudies);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const validatedData = caseStudySchema.parse(body);

        const caseStudy = await prisma.caseStudy.create({ data: validatedData });
        return NextResponse.json(caseStudy, { status: 201 });
    } catch (error) {
        console.error("Admin Case Study POST error:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
