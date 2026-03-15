import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const FALLBACK_TECH = [
    { category: "Frontend", skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", skills: ["Node.js", "Express", "Prisma", "PostgreSQL", "MongoDB"] },
    { category: "DevOps", skills: ["Vercel", "AWS", "Docker", "CI/CD", "Terraform"] },
    { category: "AI/ML", skills: ["OpenAI API", "LangChain", "Vector Databases", "Prompt Engineering"] }
];

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { order: 'asc' }
        });

        if (skills.length === 0) {
            return apiResponse({ categories: FALLBACK_TECH });
        }

        // Group by category if possible, or return raw
        return apiResponse({ categories: FALLBACK_TECH }); // For now using fallback as schema might need group mapping
    } catch (error) {
        console.error("GET_TECH_RADAR_ERROR:", error);
        return apiResponse({ categories: FALLBACK_TECH });
    }
}
