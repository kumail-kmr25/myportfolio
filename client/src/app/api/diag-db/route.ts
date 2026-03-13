import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        const adminCount = await prisma.admin.count();
        const projectCount = await prisma.project.count();
        const blogCount = await prisma.blogPost.count();
        
        return apiResponse({
            counts: {
                admins: adminCount,
                projects: projectCount,
                blogs: blogCount
            },
            database: "connected",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return apiError(error instanceof Error ? error.message : "Database connection failed", 500);
    }
}
