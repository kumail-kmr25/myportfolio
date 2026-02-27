import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const featureRequests = await prisma.featureRequest.findMany({
            orderBy: { created_at: "desc" },
        });
        return NextResponse.json(featureRequests);
    } catch (error) {
        console.error("Admin Feature Requests GET error:", error);
        return NextResponse.json({ error: "Failed to fetch feature requests" }, { status: 500 });
    }
}
