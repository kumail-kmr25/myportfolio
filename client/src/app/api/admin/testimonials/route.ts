import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getSession } from "@/lib/auth";

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
        return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, approved } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
        }

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: { approved },
        });

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error("Admin testimonials PATCH error:", error);
        return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
    }
}
