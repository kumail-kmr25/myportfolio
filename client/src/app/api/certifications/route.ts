import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const certifications = await prisma.certification.findMany({
            where: { visible: true },
            orderBy: { order: 'asc' }
        });
        
        return apiResponse({ certifications, version: "v1.0.0" });
    } catch (error) {
        console.error("GET_CERTIFICATIONS_ERROR:", error);
        return apiError("Failed to fetch certifications");
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await req.json();
        const certification = await prisma.certification.create({
            data: {
                ...body,
                issueDate: new Date(body.issueDate),
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
                skills: body.skills || [],
            }
        });
        return apiResponse(certification);
    } catch (error) {
        console.error("POST_CERTIFICATION_ERROR:", error);
        return apiError("Certification creation failed");
    }
}
