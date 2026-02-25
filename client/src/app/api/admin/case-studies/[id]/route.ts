import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";
import { caseStudySchema } from "@portfolio/shared";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Partial validation for PATCH
        const validatedData = caseStudySchema.partial().parse(body);

        const caseStudy = await prisma.caseStudy.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json(caseStudy);
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return NextResponse.json({ error: (error as any).format() }, { status: 400 });
        }
        console.error("Admin Case Study PATCH error:", error);
        return NextResponse.json({ error: "Failed to update case study" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        await prisma.caseStudy.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin Case Study DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 });
    }
}
