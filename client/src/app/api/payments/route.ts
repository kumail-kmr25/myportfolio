import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const links = await prisma.paymentLink.findMany({
            where: { active: true },
            orderBy: { createdAt: 'desc' }
        });
        return apiResponse({ links });
    } catch (error) {
        console.error("GET_PAYMENTS_ERROR:", error);
        // Return empty array instead of 500 to prevent frontend crash
        return apiResponse({ links: [] });
    }
}


export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await req.json();
        const link = await prisma.paymentLink.create({
            data: {
                ...body,
                amount: parseInt(body.amount),
            }
        });
        return apiResponse(link);
    } catch (error) {
        console.error("POST_PAYMENT_ERROR:", error);
        return apiError("Payment link creation failed");
    }
}
