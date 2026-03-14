import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        let config = await prisma.systemConfig.findFirst();

        if (!config) {
            config = await prisma.systemConfig.create({
                data: { maxActiveProjects: 2 }
            });
        }

        return apiResponse(config);
    } catch (error) {
        console.error("SYSTEM_CONFIG_GET_ERROR:", error);
        return apiError("System configuration retrieval failed");
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

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

        return apiResponse(config);
    } catch (error) {
        console.error("SYSTEM_CONFIG_PATCH_ERROR:", error);
        return apiError("Failed to update core system parameters");
    }
}
