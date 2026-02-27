import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await prisma.hireRequest.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Hire request deleted successfully" });
    } catch (error) {
        console.error("Admin hire DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete hire request" }, { status: 500 });
    }
}
