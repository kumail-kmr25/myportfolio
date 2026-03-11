import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        // Simple heartbeat query
        await prisma.$queryRaw`SELECT 1`;
        
        return NextResponse.json({
            status: "ok",
            database: "connected",
            timestamp: new Date().toISOString(),
            env: process.env.NODE_ENV
        });
    } catch (error) {
        console.error("[HEALTH-CHECK] Database connection failed:", error);
        
        return NextResponse.json({
            status: "error",
            database: "disconnected",
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString()
        }, { status: 503 });
    }
}
