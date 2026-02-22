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
        let result;
        if (bestMatch) {
            result = {
                id: bestMatch.id,
                possibleCauses: bestMatch.possibleCauses,
                debugSteps: bestMatch.debugSteps,
                complexity: bestMatch.complexity,
                recommendedService: bestMatch.recommendedService,
                isMatch: true
            };
        } else {
            // Heuristic Analysis Engine
            const heuristics = [
                { keys: ["performance", "slow", "load", "latency"], cause: "Main-thread blocking or inefficient resource hydration", step: "Analyze flame-graph for long tasks (>50ms)", service: "Performance Optimization", complexity: "High" },
                { keys: ["css", "style", "layout", "responsive", "mobile"], cause: "CSS specificity collision or missing media queries", step: "Audit layout-shift using Core Web Vitals tools", service: "Fix Bug", complexity: "Low" },
                { keys: ["api", "data", "fetch", "broken", "empty"], cause: "Stale data cache or unhandled Promise rejection", step: "Inspect Network tab for 4xx/5xx responses", service: "Backend Debugging", complexity: "Medium" },
                { keys: ["auth", "login", "secure", "token"], cause: "JWT expiration or improper session persistence", step: "Verify HttpOnly cookie headers", service: "Backend Debugging", complexity: "High" },
                { keys: ["env", "config", "build", "deploy"], cause: "Strict Content Security Policy or missing env vars", step: "Check CI/CD logs for build-time variable injection", service: "Deployment Issue", complexity: "Medium" },
            ];

            const matchedHeuristic = heuristics.find(h => h.keys.some(k => inputLower.includes(k)));

            if (matchedHeuristic) {
                result = {
                    possibleCauses: [matchedHeuristic.cause, "Mismatched versions between dependencies", "Incorrect environment configuration"],
                    debugSteps: [matchedHeuristic.step, "Check server and browser logs for cryptic errors", "Isolate the problem by disabling non-essential features"],
                    complexity: matchedHeuristic.complexity,
                    recommendedService: matchedHeuristic.service,
                    isMatch: false,
                    isHeuristic: true
                };
            } else {
                result = {
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
            }
        }

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
