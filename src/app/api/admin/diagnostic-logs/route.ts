import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const db = prisma as any;
        const logs = await db.diagnosticLog.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
    }
}
