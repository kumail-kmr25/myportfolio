import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { approved } = await req.json();

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: { approved: Boolean(approved) },
        });

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error("Testimonial PATCH error:", error);
        return NextResponse.json(
            { error: "Failed to update testimonial" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        await prisma.testimonial.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Testimonial DELETE error:", error);
        return NextResponse.json(
            { error: "Failed to delete testimonial" },
            { status: 500 }
        );
    }
}
