import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const tiers = await prisma.serviceTier.findMany({
            orderBy: { order: "asc" }
        });
        return NextResponse.json(tiers);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const data = await req.json();
        const tier = await prisma.serviceTier.create({
            data: {
                name: data.name,
                price: data.price,
                description: data.description,
                features: data.features || [],
                icon: data.icon || "Code",
                delay: data.delay || 0.1,
                featured: data.featured || false,
                isVisible: data.isVisible !== undefined ? data.isVisible : true,
                order: data.order || 0
            }
        });
        return NextResponse.json(tier);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
