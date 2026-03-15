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

        const phases = await prisma.journeyPhase.findMany({
            orderBy: { order: "asc" },
        });

        return apiResponse(phases);
    } catch (error) {
        console.error("[API] Admin journey GET error:", error);
        return apiError("Failed to fetch journey data");
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const data = await request.json();

        if (!data.title || !data.description || !data.phase) {
            return apiError("Required field sequence incomplete", 400);
        }

        const phase = await prisma.journeyPhase.create({
            data: {
                title: data.title,
                subtitle: data.description || "",
                ecoIcon: data.ecoIcon || "🌱",
                ecoStage: data.ecoStage || "Seed",
                dateRange: data.phase || "",
                order: parseInt(data.order?.toString()) || 0,
            },
        });

        return apiResponse(phase, 201);
    } catch (error) {
        console.error("[API] Admin journey POST error:", error);
        return apiError("Failed to persist journey phase");
    }
}
