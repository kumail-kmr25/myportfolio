import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        await prisma.$connect();
        const projectCount = await prisma.project.count();
        
        return apiResponse({ 
            status: "Database connected", 
            timestamp: new Date().toISOString(),
            projectCount
        });
    } catch (error: any) {
        console.error("[DB-TEST] Connection failed:", error);
        return apiError("Database connection failed: " + (error.message || "Unknown error"));
    }
}
