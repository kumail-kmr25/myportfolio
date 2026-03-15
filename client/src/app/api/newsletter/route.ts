import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export async function POST(req: Request) {
    try {
        const { email, source } = await req.json();
        if (!email) return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });

        // Register as a subscriber
        const subscriber = await prisma.subscriber.upsert({
            where: { email },
            update: {
                confirmed: true, // Auto-confirming for now in this flow
                updatedAt: new Date()
            },
            create: {
                email,
                confirmed: true,
                newArticles: true,
                newProjects: true,
                availability: true
            }
        });

        return NextResponse.json({ success: true, data: subscriber });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
