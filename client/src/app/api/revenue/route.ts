import { apiResponse } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Curated revenue showcase — update via admin or manually
const REVENUE_DATA = {
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
        },
        {
            id: "rev-3",
            clientName: "RetailPro Group",
            industry: "E-Commerce",
            revenueBefore: 800000,
            revenueAfter: 2400000,
            growth: "200%",
            currency: "INR"
        }
    ]
};

export async function GET() {
    return apiResponse(REVENUE_DATA);
}
