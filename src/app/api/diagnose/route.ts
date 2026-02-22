import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import xss from "xss";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { description, techStack, errorMessage, environment } = body;

        if (!description) {
            return NextResponse.json({ error: "Description is required" }, { status: 400 });
        }

        const sanitizedDescription = xss(description);
        const inputLower = sanitizedDescription.toLowerCase();

        // 1. Fetch all patterns to find matches
        const db = prisma as any;
        const patterns = await db.issuePattern.findMany();

        let bestMatch = null;
        let maxKeywords = 0;

        for (const pattern of patterns) {
            const matches = (pattern.keywords as string[]).filter((kw: string) => inputLower.includes(kw.toLowerCase()));
            if (matches.length > 0 && matches.length > maxKeywords) {
                maxKeywords = matches.length;
                bestMatch = pattern;
            }
        }

        // 2. Prepare result
        const result = bestMatch ? {
            id: bestMatch.id,
            possibleCauses: bestMatch.possibleCauses,
            debugSteps: bestMatch.debugSteps,
            complexity: bestMatch.complexity,
            recommendedService: bestMatch.recommendedService,
            isMatch: true
        } : {
            // Generic Fallback
            possibleCauses: [
                "Incorrect environment configuration",
                "Mismatched versions between dependencies",
                "Silent failures in asynchronous operations"
            ],
            debugSteps: [
                "Check server and browser logs for cryptic errors",
                "Isolate the problem by disabling non-essential features",
                "Verify the exact state of variables right before the crash"
            ],
            complexity: "Medium",
            recommendedService: "Backend Debugging",
            isMatch: false
        };

        // 3. Log the request
        await db.diagnosticLog.create({
            data: {
                description: sanitizedDescription,
                techStack: techStack ? xss(techStack) : null,
                errorMessage: errorMessage ? xss(errorMessage) : null,
                environment,
                matchedPatternId: bestMatch?.id || null
            }
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("DIAGNOSE API ERROR:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
