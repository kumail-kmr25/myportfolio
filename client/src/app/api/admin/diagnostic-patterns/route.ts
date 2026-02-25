import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const patterns = await prisma.issuePattern.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(patterns);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const pattern = await prisma.issuePattern.create({ data: body });
        return NextResponse.json(pattern, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
