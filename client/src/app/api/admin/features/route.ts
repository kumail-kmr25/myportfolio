import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const features = await prisma.featureToggle.findMany({
            orderBy: { category: "asc" },
        });

        return apiResponse(features);
    } catch (error) {
        console.error("Admin features GET error:", error);
        return apiError("Failed to fetch feature toggle registry");
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const data = await request.json();
        
        if (!data.featureKey || !data.name || !data.category) {
            return apiError("featureKey, name, and category are required", 400);
        }

        const feature = await prisma.featureToggle.upsert({
            where: { featureKey: data.featureKey },
            update: {
                name: data.name,
                description: data.description,
                enabled: data.enabled ?? false,
                config: data.config ?? {},
                category: data.category,
            },
            create: {
                featureKey: data.featureKey,
                name: data.name,
                description: data.description,
                enabled: data.enabled ?? false,
                config: data.config ?? {},
                category: data.category,
            }
        });

        return apiResponse(feature);
    } catch (error) {
        console.error("Admin features POST error:", error);
        return apiError("Failed to configure feature");
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const { id, enabled, config } = await request.json();

        if (!id) return apiError("Feature ID required", 400);

        const updatedFeature = await prisma.featureToggle.update({
            where: { id },
            data: { 
                enabled: enabled !== undefined ? enabled : undefined,
                config: config || undefined
            },
        });

        return apiResponse(updatedFeature);
    } catch (error) {
        console.error("Admin features PATCH error:", error);
        return apiError("Failed to update feature state");
    }
}
