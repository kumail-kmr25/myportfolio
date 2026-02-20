import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { replied } = await req.json();
        const { id } = await params;

        const updated = await prisma.contactSubmission.update({
            where: { id },
            data: { replied },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Admin contact PATCH error:", error);
        return NextResponse.json(
            { error: "Failed to update message" },
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

        // Verify message exists
        const existingMessage = await prisma.contactSubmission.findUnique({
            where: { id },
        });

        if (!existingMessage) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        await prisma.contactSubmission.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin contact DELETE error:", error);
        return NextResponse.json(
            { error: "Failed to delete message" },
            { status: 500 }
        );
    }
}
