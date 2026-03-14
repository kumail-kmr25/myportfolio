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

        const [referrals, leadMagnets] = await Promise.all([
            (prisma as any).referral.findMany({
                orderBy: { createdAt: "desc" }
            }),
            (prisma as any).leadMagnetDownload.findMany({
                orderBy: { createdAt: "desc" }
            })
        ]);

        return apiResponse({
            referrals,
            leadMagnets
        });
    } catch (error) {
        console.error("PROMOTIONS_API_ERROR:", error);
        return apiError("Failed to fetch viral telemetry");
    }
}
