import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { siteStatsSchema } from "@/lib/schemas/site-stats";

export async function PATCH(req: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = siteStatsSchema.parse(body);

        const existingStats = await prisma.siteStats.findFirst();

        const stats = await prisma.siteStats.upsert({
            where: { id: existingStats?.id || "default" },
            update: {
                ...validatedData,
                lastUpdated: new Date(),
            },
            create: {
                ...validatedData,
                lastUpdated: new Date(),
            },
        });

        return NextResponse.json(stats);
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return NextResponse.json({ error: (error as any).format() }, { status: 400 });
        }
        console.error("Admin Stats PATCH error:", error);
        return NextResponse.json(
            { error: "Failed to update stats" },
            { status: 500 }
        );
    }
}
