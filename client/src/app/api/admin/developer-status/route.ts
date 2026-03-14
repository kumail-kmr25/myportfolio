import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await request.json();
        const { status, capacityPercent, nextAvailabilityDays, currentFocus, customMessage } = body;

        const existing = await prisma.developerStatus.findFirst();

        let result;
        if (existing) {
            result = await prisma.developerStatus.update({
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
            result = await prisma.developerStatus.create({
                data: { 
                    status: status || "available", 
                    capacityPercent: capacityPercent || 0, 
                    nextAvailabilityDays: nextAvailabilityDays || 0, 
                    currentFocus: currentFocus || "Open to new projects", 
                    customMessage 
                }
            });
        }

        return apiResponse(result);
    } catch (error) {
        console.error("Developer status PATCH error:", error);
        return apiError("Broadcast signal synchronization failed");
    }
}
