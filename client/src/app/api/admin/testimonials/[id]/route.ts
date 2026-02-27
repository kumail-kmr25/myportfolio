import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { approved } = await request.json();

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: { approved: Boolean(approved) },
        });

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error("Testimonial PATCH error:", error);
        return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
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
        return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
    }
}
