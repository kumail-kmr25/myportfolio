import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { caseStudySchema } from "@/lib/schemas/case-study";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const caseStudies = await prisma.caseStudy.findMany({
            orderBy: { created_at: "desc" },
        });
        return NextResponse.json(caseStudies);
    } catch (error) {
        console.error("Admin Case Studies GET error:", error);
        return NextResponse.json(
            { error: "Failed to fetch case studies" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = caseStudySchema.parse(body);

        const caseStudy = await prisma.caseStudy.create({
            data: validatedData,
        });

        return NextResponse.json(caseStudy, { status: 201 });
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return NextResponse.json({ error: (error as any).format() }, { status: 400 });
        }
        console.error("Admin Case Studies POST error:", error);
        return NextResponse.json(
            { error: "Failed to create case study" },
            { status: 500 }
        );
    }
}
