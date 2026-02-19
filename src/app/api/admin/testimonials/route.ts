import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Admin endpoint: fetch ALL testimonials (including unapproved)
export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const testimonials = await prisma.testimonial.findMany({
            orderBy: { created_at: "desc" },
        });

        return NextResponse.json(testimonials);
    } catch (error) {
        console.error("Admin testimonials error:", error);
        return NextResponse.json(
            { error: "Failed to fetch testimonials" },
            { status: 500 }
        );
    }
}
