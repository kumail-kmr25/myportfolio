import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const db = prisma as any;
        const patterns = await db.issuePattern.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(patterns);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const db = prisma as any;
        const pattern = await db.issuePattern.create({
            data: body
        });
        return NextResponse.json(pattern, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
