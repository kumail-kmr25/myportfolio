import { prisma } from "@portfolio/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

const DEFAULT_SETTINGS = {
    id: "default-settings",
    heroHeadline: "Building the Future of Digital Experience",
    heroSubheadline: "Premium Full-Stack Engineering & SaaS Development",
    adminName: "Kumail KMR",
    emailAddress: "ka6307464@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/kumail-kmr25",
    githubUrl: "https://github.com/kumail-kmr25"
};

export async function GET() {
    try {
        let settings = await prisma.settings.findFirst();
        
        if (!settings) {
            return apiResponse(DEFAULT_SETTINGS);
        }
        
        return apiResponse(settings);
    } catch (error: any) {
        console.error("Settings GET error:", error);
        // Return default instead of error
        return apiResponse(DEFAULT_SETTINGS);
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
