import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { featureRequestSchema } from "@/lib/schemas/feature-request";

export async function GET() {
    try {
        const completedRequests = await prisma.featureRequest.findMany({
            where: { status: "completed" },
            orderBy: { created_at: "desc" },
            take: 5, // Show recently completed 5 suggestions
        });
        return NextResponse.json(completedRequests);
    } catch (error) {
        console.error("Error fetching completed feature requests:", error);
        return NextResponse.json(
            { error: "Failed to fetch feature requests" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = featureRequestSchema.parse(body);

        const featureRequest = await prisma.featureRequest.create({
            data: validatedData,
        });

        return NextResponse.json(featureRequest, { status: 201 });
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return NextResponse.json({ error: (error as any).format() }, { status: 400 });
        }
        console.error("Error creating feature request:", error);
        return NextResponse.json(
            { error: "Failed to submit feature request" },
            { status: 500 }
        );
    }
}
