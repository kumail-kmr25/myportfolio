import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const phases = await prisma.journeyPhase.findMany({
            orderBy: { order: "asc" },
        });

        return NextResponse.json(phases);
    } catch (error) {
        console.error("[API] Admin journey GET error:", error);
        return NextResponse.json({ error: "Failed to fetch journey phases" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json();

        // Basic validation
        if (!data.title || !data.description || !data.phase) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const phase = await prisma.journeyPhase.create({
            data: {
                phase: data.phase,
                title: data.title,
                description: data.description,
                icon: data.icon || "Code2",
                color: data.color || "from-blue-500/20 to-indigo-500/20",
                order: parseInt(data.order) || 0,
            },
        });

        return NextResponse.json(phase);
    } catch (error) {
        console.error("[API] Admin journey POST error:", error);
        return NextResponse.json({ error: "Failed to create journey phase" }, { status: 500 });
    }
}
