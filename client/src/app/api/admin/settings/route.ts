import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

export async function GET() {
    try {
        // We allow GET for public use (footer/contact)
        let settings = await prisma.settings.findFirst();
        
        if (!settings) {
            // Initialize if not exists
            settings = await prisma.settings.create({
                data: {}
            });
        }
        
        return apiResponse(settings);
    } catch (error: any) {
        console.error("Settings GET error:", error);
        return apiError("Failed to fetch settings");
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return apiError("Unauthorized", 401);
        }

        const body = await request.json();
        
        let settings = await prisma.settings.findFirst();
        
        if (!settings) {
            settings = await prisma.settings.create({
                data: body
            });
        } else {
            settings = await prisma.settings.update({
                where: { id: settings.id },
                data: body
            });
        }
        
        return apiResponse(settings);
    } catch (error: any) {
        console.error("Settings PATCH error:", error);
        return apiError("Failed to update settings");
    }
}
