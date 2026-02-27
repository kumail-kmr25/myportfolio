import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Admin: Fetch all hire requests
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const hireRequests = await prisma.hireRequest.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(hireRequests);
    } catch (error) {
        console.error("Admin hire GET error:", error);
        return NextResponse.json({ error: "Failed to fetch hire requests" }, { status: 500 });
    }
}

// Admin: Update hire request status
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
        }

        const updatedRequest = await prisma.hireRequest.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedRequest);
    } catch (error) {
        console.error("Admin hire PATCH error:", error);
        return NextResponse.json({ error: "Failed to update hire request" }, { status: 500 });
    }
}
