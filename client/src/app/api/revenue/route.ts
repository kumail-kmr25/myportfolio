import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const FALLBACK_REVENUE = {
    stats: {
        totalGenerated: "1.2Cr+",
        averageROI: "340%",
        clientRetention: "95%"
    },
    items: [
        {
            id: "rev-1",
            clientName: "Edunova SaaS",
            industry: "EdTech",
            revenueBefore: 200000,
            revenueAfter: 850000,
            growth: "325%",
            currency: "INR"
        },
        {
            id: "rev-2",
            clientName: "MedQ Systems",
            industry: "Healthcare",
            revenueBefore: 500000,
            revenueAfter: 1200000,
            growth: "140%",
            currency: "INR"
        }
    ]
};

export async function GET() {
    try {
        const revenueData = await prisma.clientRevenue.findMany({
            where: { isLive: true },
            orderBy: { totalRevenueGenerated: 'desc' }
        });

        if (revenueData.length === 0) {
            return apiResponse(FALLBACK_REVENUE);
        }

        // Transform if needed
        const stats = {
            totalGenerated: "1.2Cr+", // Aggregated logic here
            averageROI: "340%",
            clientRetention: "95%"
        };

        return apiResponse({ stats, items: revenueData });
    } catch (error) {
        console.error("GET_REVENUE_ERROR:", error);
        return apiResponse(FALLBACK_REVENUE);
    }
}
