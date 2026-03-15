import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const steps = await prisma.processStep.findMany({
            orderBy: { order: "asc" }
        });
        return NextResponse.json(steps);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const data = await req.json();
        const step = await prisma.processStep.create({
            data: {
                title: data.title,
                description: data.description,
                order: data.order || 0,
                icon: data.icon || "Zap"
            }
        });
        return NextResponse.json(step);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
