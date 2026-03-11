import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        const adminCount = await prisma.admin.count();
        const projectCount = await prisma.project.count();
        const blogCount = await prisma.blogPost.count();
        
        return NextResponse.json({
            success: true,
            counts: {
                admins: adminCount,
                projects: projectCount,
                blogs: blogCount
            },
            database: "connected",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Database connection failed",
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
