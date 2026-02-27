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
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const { status } = await request.json();

        const updated = await prisma.featureRequest.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Admin Feature Request PATCH error:", error);
        return NextResponse.json({ error: "Failed to update feature request" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;

        await prisma.featureRequest.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin Feature Request DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete feature request" }, { status: 500 });
    }
}
