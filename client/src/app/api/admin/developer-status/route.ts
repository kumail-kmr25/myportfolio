import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";

export async function PATCH(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { status, capacityPercent, nextAvailabilityDays, currentFocus, customMessage } = body;

        // Upsert — only one row
        const existing = await (prisma as any).developerStatus.findFirst();

        let result;
        if (existing) {
            result = await (prisma as any).developerStatus.update({
                where: { id: existing.id },
                data: {
                    ...(status !== undefined && { status }),
                    ...(capacityPercent !== undefined && { capacityPercent: Number(capacityPercent) }),
                    ...(nextAvailabilityDays !== undefined && { nextAvailabilityDays: Number(nextAvailabilityDays) }),
                    ...(currentFocus !== undefined && { currentFocus }),
                    ...(customMessage !== undefined && { customMessage }),
                }
            });
        } else {
            result = await (prisma as any).developerStatus.create({
                data: { status: status || "available", capacityPercent: capacityPercent || 0, nextAvailabilityDays: nextAvailabilityDays || 0, currentFocus: currentFocus || "Open to new projects", customMessage }
            });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Developer status PATCH error:", error);
        return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
    }
}
