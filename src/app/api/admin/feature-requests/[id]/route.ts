import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { featureRequestSchema } from "@/lib/schemas/feature-request";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { status } = await req.json();

        if (!["pending", "building", "completed"].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const featureRequest = await prisma.featureRequest.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(featureRequest);
    } catch (error) {
        console.error("Admin Feature Request PATCH error:", error);
        return NextResponse.json(
            { error: "Failed to update feature request" },
            { status: 500 }
        );
    }
}
