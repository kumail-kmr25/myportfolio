import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        await prisma.$connect();
        return NextResponse.json({ status: "connected", timestamp: new Date().toISOString() });
    } catch (error) {
        console.error("[DB-STATUS] Connection failed:", error);
        return NextResponse.json({ status: "failed", timestamp: new Date().toISOString() }, { status: 500 });
    }
}
