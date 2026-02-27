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
        const data = await request.json();

        const phase = await prisma.journeyPhase.update({
            where: { id },
            data: {
                phase: data.phase,
                title: data.title,
                description: data.description,
                icon: data.icon,
                color: data.color,
                order: data.order !== undefined ? parseInt(data.order) : undefined,
            },
        });

        return NextResponse.json(phase);
    } catch (error) {
        console.error("[API] Admin journey PATCH error:", error);
        return NextResponse.json({ error: "Failed to update journey phase" }, { status: 500 });
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

        await prisma.journeyPhase.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[API] Admin journey DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete journey phase" }, { status: 500 });
    }
}
