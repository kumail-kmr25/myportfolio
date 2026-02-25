import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        let config = await prisma.systemConfig.findFirst();

        if (!config) {
            config = await prisma.systemConfig.create({
                data: { maxActiveProjects: 2 }
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const existing = await prisma.systemConfig.findFirst();

        let config;
        if (existing) {
            config = await prisma.systemConfig.update({
                where: { id: existing.id },
                data: body
            });
        } else {
            config = await prisma.systemConfig.create({
                data: body
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
