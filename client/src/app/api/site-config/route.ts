import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const theme = await prisma.themeConfig.findFirst();
        const language = await prisma.languageConfig.findFirst();
        
        return apiResponse({ 
            theme: theme || { enabled: true, defaultTheme: 'system' },
            language: language || { enabled: false, defaultLang: 'en' }
        });
    } catch (error) {
        console.error("GET_CONFIGS_ERROR:", error);
        return apiError("Failed to fetch site configurations");
    }
}
