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

        const testimonials = await prisma.testimonial.findMany({
            orderBy: { created_at: "desc" }
        });

        return apiResponse(testimonials);
    } catch (error) {
        console.error("Admin testimonials error:", error);
        return apiError("Failed to fetch testimonials");
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return apiError("Unauthorized", 401);

        const body = await request.json();
        const { id, approved, name, message, role, company, verified, featured, relationship_type, intervention_type, deliveryRating, about_delivery_lead } = body;

        if (!id) return apiError("Testimonial ID is required", 400);

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: {
                approved,
                name,
                message,
                role,
                company,
                verified,
                featured,
                relationship_type,
                intervention_type,
                rating: deliveryRating,
                about_delivery_lead
            },
        });

        return apiResponse(testimonial);
    } catch (error) {
        console.error("Admin testimonials PATCH error:", error);
        return apiError("Failed to update testimonial status");
    }
}
