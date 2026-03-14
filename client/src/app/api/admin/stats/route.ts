import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { siteStatsSchema } from "@portfolio/shared";
import { revalidatePath } from "next/cache";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await request.json();
        const validatedData = siteStatsSchema.parse(body);

        const existingStats = await prisma.siteStats.findFirst();

        const stats = await prisma.siteStats.upsert({
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

        revalidatePath("/", "layout");
        revalidatePath("/api/stats");

        return apiResponse(stats);
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return apiError("Validation failed: " + JSON.stringify((error as any).format()), 400);
        }
        console.error("Admin Stats PATCH error:", error);
        return apiError("System metrics sync failure");
    }
}
