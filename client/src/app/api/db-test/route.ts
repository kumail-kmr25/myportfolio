import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        // Attempt to connect and run a simple query
        await prisma.$connect();
        
        // Count some record as a real test
        const projectCount = await prisma.project.count();
        
        return NextResponse.json({ 
            status: "Database connected", 
            timestamp: new Date().toISOString(),
            projectCount
        });
    } catch (error) {
        console.error("[DB-TEST] Connection failed:", error);
        return NextResponse.json({ 
            status: "Database connection failed", 
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString()
        }, { status: 200 }); // Changed to 200 to keep vercel logs clean
    } finally {
        // Note: In serverless, we generally don't disconnect if we want to reuse the connection,
        // but for a test endpoint, it's okay to let it be.
    }
}
