import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const body = await req.json();
        const db = prisma as any;
        const pattern = await db.issuePattern.update({
            where: { id },
            data: body
        });
        return NextResponse.json(pattern);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const db = prisma as any;
        await db.issuePattern.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
