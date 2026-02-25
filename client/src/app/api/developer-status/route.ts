import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        let status = await (prisma as any).developerStatus.findFirst({
            orderBy: { updatedAt: "desc" }
        });

        if (!status) {
            // Seed default
            status = await (prisma as any).developerStatus.create({
                data: {
                    status: "available",
                    capacityPercent: 0,
                    nextAvailabilityDays: 0,
                    currentFocus: "Open to new projects",
                }
            });
        }

        return NextResponse.json(status);
    } catch (error) {
        console.error("Developer status GET error:", error);
        return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const payload = await getSession();
        if (!payload || !payload.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { status, capacityPercent, nextAvailabilityDays, currentFocus, customMessage } = body;

        let devStatus = await (prisma as any).developerStatus.findFirst({
            orderBy: { updatedAt: "desc" }
        });

        if (devStatus) {
            devStatus = await (prisma as any).developerStatus.update({
                where: { id: devStatus.id },
                data: {
                    ...(status && { status }),
                    ...(capacityPercent !== undefined && { capacityPercent }),
                    ...(nextAvailabilityDays !== undefined && { nextAvailabilityDays }),
                    ...(currentFocus && { currentFocus }),
                    ...(customMessage !== undefined && { customMessage }),
                }
            });
        } else {
            devStatus = await (prisma as any).developerStatus.create({
                data: {
                    status: status || "available",
                    capacityPercent: capacityPercent || 0,
                    nextAvailabilityDays: nextAvailabilityDays || 0,
                    currentFocus: currentFocus || "Open to new projects",
                    customMessage: customMessage || null,
                }
            });
        }

        return NextResponse.json(devStatus);
    } catch (error) {
        console.error("Developer status PATCH error:", error);
        return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
    }
}
