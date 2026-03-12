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
            env: process.env.NODE_ENV,
            deployment_version: "v2.1.0-stable",
            vercel_id: process.env.VERCEL_URL || "local"
        });
    } catch (error) {
        console.error("[HEALTH-CHECK] Database connection failed:", error);
        
        return NextResponse.json({
            status: "error",
            database: "disconnected",
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
            deployment_version: "v2.1.0-stable",
            vercel_id: process.env.VERCEL_URL || "local"
        }, { status: 503 });
    }
}
