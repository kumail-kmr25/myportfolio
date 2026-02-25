import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";
import { siteStatsSchema } from "@portfolio/shared";

export async function PATCH(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = siteStatsSchema.parse(body);

        const existingStats = await prisma.siteStats.findFirst();

        const stats = await prisma.siteStats.upsert({
            // Since we use uuid now, if not existing we use a placeholder or let it create
            where: { id: existingStats?.id || "00000000-0000-0000-0000-000000000000" },
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
        return NextResponse.json({ error: "Failed to update stats" }, { status: 500 });
    }
}
