import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const db = prisma as any;
        let config = await db.systemConfig.findFirst();

        if (!config) {
            config = await db.systemConfig.create({
                data: { maxActiveProjects: 2 }
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const db = prisma as any;

        const existing = await db.systemConfig.findFirst();

        let config;
        if (existing) {
            config = await db.systemConfig.update({
                where: { id: existing.id },
                data: body
            });
        } else {
            config = await db.systemConfig.create({
                data: body
            });
        }

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
