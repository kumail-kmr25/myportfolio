import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const features = await prisma.featureToggle.findMany({
            where: { enabled: true },
            select: {
                featureKey: true,
                config: true,
                category: true
            }
        });

        const featureMap = features.reduce((acc: Record<string, any>, feat: any) => {
            acc[feat.featureKey] = {
                enabled: true,
                config: feat.config,
                category: feat.category
            };
            return acc;
        }, {});

        return apiResponse(featureMap);
    } catch (error) {
        console.error("Public features GET error:", error);
        // Return empty map instead of error to prevent frontend crash
        return apiResponse({}); 
    }
}

