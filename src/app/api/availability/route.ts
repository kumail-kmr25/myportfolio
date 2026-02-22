import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = prisma as any;
        const admin = await db.admin.findFirst({
            select: { availabilityStatus: true }
        });

        return NextResponse.json({ status: admin?.availabilityStatus || "Available" });
    } catch (error) {
        return NextResponse.json({ status: "Available" });
    }
}
