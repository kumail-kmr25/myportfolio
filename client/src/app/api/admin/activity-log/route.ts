import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const logs = await (prisma as any).adminActivityLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 50,
            include: { admin: { select: { name: true, email: true } } }
        });

        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch activity logs" }, { status: 500 });
    }
}
