import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { status } = await req.json();
        const db = prisma as any;

        // Update the admin found in session
        await db.admin.updateMany({
            where: { email: session.user.email },
            data: { availabilityStatus: status }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update availability" }, { status: 500 });
    }
}
