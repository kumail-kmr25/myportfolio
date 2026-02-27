import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { status } = await request.json();

        // Update the system config's manual override to reflect availability
        const existing = await prisma.systemConfig.findFirst();
        if (existing) {
            await prisma.systemConfig.update({
                where: { id: existing.id },
                data: { manualOverride: status }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update availability" }, { status: 500 });
    }
}
