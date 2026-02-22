import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { caseStudySchema } from "@/lib/schemas/case-study";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();

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
        return NextResponse.json(
            { error: "Failed to update case study" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
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
        return NextResponse.json(
            { error: "Failed to delete case study" },
            { status: 500 }
        );
    }
}
